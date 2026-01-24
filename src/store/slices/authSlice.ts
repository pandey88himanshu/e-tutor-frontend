import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  username: string;
  role?: "USER" | "ADMIN" | "INSTRUCTOR";
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

/* =======================
   COOKIE HELPERS
   ======================= */

function setAccessTokenCookie(token: string) {
  if (typeof document !== "undefined") {
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = 60 * 15; // 15 minutes
    const secure = isProduction ? ";Secure" : "";
    document.cookie = `accessToken=${token};Path=/;Max-Age=${maxAge};SameSite=Lax${secure}`;
  }
}

function setUserRoleCookie(role: string) {
  if (typeof document !== "undefined") {
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = 60 * 15; // 15 minutes
    const secure = isProduction ? ";Secure" : "";
    document.cookie = `userRole=${role};Path=/;Max-Age=${maxAge};SameSite=Lax${secure}`;
  }
}

function removeAccessTokenCookie() {
  if (typeof document !== "undefined") {
    document.cookie = "accessToken=;Path=/;Expires=Thu, 01 Jan 1970 00:00:00 GMT;Max-Age=0;SameSite=Lax";
    document.cookie = "userRole=;Path=/;Expires=Thu, 01 Jan 1970 00:00:00 GMT;Max-Age=0;SameSite=Lax";
  }
}

/* =======================
   INITIAL STATE HYDRATION
   ======================= */

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

// ✅ FIXED: Check BOTH LocalStorage (Persistent) and SessionStorage (Temporary)
if (typeof window !== "undefined") {
  try {
    // 1. Try LocalStorage first (Remember Me)
    let token = localStorage.getItem("accessToken");
    let userStr = localStorage.getItem("user");

    // 2. If not found, try SessionStorage (Temporary Session)
    if (!token || !userStr) {
      token = sessionStorage.getItem("accessToken");
      userStr = sessionStorage.getItem("user");
    }

    if (token && userStr) {
      const user = JSON.parse(userStr);
      // Validate structure
      if (user && user.id && (user.username || user.email)) {
        initialState.accessToken = token;
        initialState.user = user;
        // Ensure cookie is synced
        setAccessTokenCookie(token);
      }
    }
  } catch (error) {
    console.error("❌ Invalid auth data, clearing...");
    // Clear EVERYTHING to be safe
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    removeAccessTokenCookie();
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ UPDATE: Accept 'rememberMe' to decide where to store data
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: User; rememberMe?: boolean }>
    ) => {
      console.log("🔧 setCredentials:", action.payload.user);

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        const { accessToken, user, rememberMe } = action.payload;

        // Set Cookies (Always needed for middleware)
        setAccessTokenCookie(accessToken);
        if (user.role) setUserRoleCookie(user.role);

        // Handle Storage based on Remember Me
        if (rememberMe) {
          // CASE 1: Persistent (LocalStorage)
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          // Clear session to avoid duplicates
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("user");
        } else {
          // CASE 2: Temporary (SessionStorage)
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("user", JSON.stringify(user));

          // Clear local to ensure we don't accidentally persist
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        // We need to know where the token currently lives to update it correctly
        // If it exists in Local, update Local. Otherwise update Session.
        if (localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", action.payload);
        } else {
          sessionStorage.setItem("accessToken", action.payload);
        }
        setAccessTokenCookie(action.payload);
      }
    },

    clearCredentials: (state) => {
      console.log("🚪 clearCredentials called - logging out");
      state.accessToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        // ✅ CLEAR BOTH STORAGES
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");

        // Optional: Keep email for auto-fill if you want, or clear it
        // localStorage.removeItem("rememberedIdentifier"); 

        removeAccessTokenCookie();
      }
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;