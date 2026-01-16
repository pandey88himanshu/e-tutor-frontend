import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

/* =======================
   COOKIE HELPERS
   =======================
   These helpers manage the accessToken cookie for middleware authentication.
*/

function setAccessTokenCookie(token: string) {
  if (typeof document !== "undefined") {
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = 60 * 15; // 15 minutes
    const secure = isProduction ? ";Secure" : "";
    document.cookie = `accessToken=${token};Path=/;Max-Age=${maxAge};SameSite=Lax${secure}`;
  }
}

function removeAccessTokenCookie() {
  if (typeof document !== "undefined") {
    document.cookie = "accessToken=;Path=/;Max-Age=0;SameSite=Lax";
  }
}

// ✅ FIXED: Safe initialization
const initialState: AuthState = {
  accessToken: null,
  user: null,
};

// Load from localStorage SAFELY only AFTER checking validity
if (typeof window !== "undefined") {
  try {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      const user = JSON.parse(userStr);
      // ✅ Validate user object structure
      if (user && user.id && (user.username || user.email)) {
        initialState.accessToken = token;
        initialState.user = user;
        // Also ensure cookie is set on initial load
        setAccessTokenCookie(token);
      }
    }
  } catch (error) {
    console.error("❌ Invalid localStorage auth data, clearing...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    removeAccessTokenCookie();
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      console.log("🔧 setCredentials:", action.payload.user); // DEBUG

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        // Set cookie for middleware authentication
        setAccessTokenCookie(action.payload.accessToken);
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload);
        // Update cookie for middleware authentication
        setAccessTokenCookie(action.payload);
      }
    },

    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("pendingSignupEmail");
        // Remove cookie for middleware authentication
        removeAccessTokenCookie();
      }
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
