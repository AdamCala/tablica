import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/userModel";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null | User;
}

const initialState: AuthState = { user: null };

const loadUserFromLocalStorage = (): AuthState => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return { user: JSON.parse(storedUser) };
  }
  return initialState;
};

export const authSlice = createSlice({
  name: "Auth",
  initialState: loadUserFromLocalStorage(),
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
