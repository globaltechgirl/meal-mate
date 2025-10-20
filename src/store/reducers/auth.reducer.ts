import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthState } from "@/types/auth";
import { ReduxSlices } from "@/types/enums";

export const initialAuthState: AuthState = {
  loggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: ReduxSlices.Auth,
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.loggedIn = !!action.payload;
    },
    loginUser: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { setToken, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
