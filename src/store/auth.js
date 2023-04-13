import { createSlice } from "@reduxjs/toolkit";
import storage from "services/storage";

const initialState = {
  isFetched: false,
  isAuthenticated: false,
  data: {},
  token: storage.get("token"),
  dataCreate: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        token: action.payload.token,
        data: action.payload.user,
        dataCreate: action.payload,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        isFetched: true,
        isAuthenticated: false,
        token: null,
        data: {},
        dataCreate: action.payload,
      };
    },
    getMe: (state, action) => {
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        data: action.payload,
        dataCreate: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut, getMe } = authSlice.actions;

export default authSlice.reducer;
