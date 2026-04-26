import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuth: !!localStorage.getItem("token"),
    role: null,
    user: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuth = true;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
    },

    // 🔥 ADD THIS (VERY IMPORTANT)
    setUser: (state, action) => {
      state.isAuth = true;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.role = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;