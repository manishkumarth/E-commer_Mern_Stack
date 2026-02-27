import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuth: !!localStorage.getItem("token"),
    role:null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuth = true;
      state.role=action.payload.role
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
