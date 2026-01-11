import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  pendingEmail: string | null;
}

const initialState: SignupState = {
  pendingEmail: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setPendingEmail(state, action: PayloadAction<string>) {
      state.pendingEmail = action.payload;
    },
    clearPendingEmail(state) {
      state.pendingEmail = null;
    },
  },
});

export const { setPendingEmail, clearPendingEmail } = signupSlice.actions;
export default signupSlice.reducer;
