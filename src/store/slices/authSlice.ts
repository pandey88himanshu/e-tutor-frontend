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

// Initialize from localStorage for persistence
const initialState: AuthState = {
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set accessToken and optionally user
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user?: User }>
    ) => {
      state.accessToken = action.payload.accessToken;

      if (action.payload.user) {
        state.user = action.payload.user;
      }

      // Persist in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      }
    },

    // Only update accessToken (for refresh flow)
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
      }
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;
