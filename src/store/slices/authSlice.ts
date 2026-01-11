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
      }
    }
  } catch (error) {
    console.error("❌ Invalid localStorage auth data, clearing...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
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
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload);
      }
    },

    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("pendingSignupEmail");
      }
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
