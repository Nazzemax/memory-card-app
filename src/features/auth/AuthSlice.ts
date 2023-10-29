import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "../../app/types";
import { login } from "./AuthActions";

const initialState:User = {
  user:{
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,  // количество колод
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,// подтвердил ли почту
    rememberMe: false,
    error: '',
  },
  isLoading:false,
  isAuthenticated:false,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
     .addCase(login
     .pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
    })
     .addCase(login
      .fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login
        .rejected, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          action.error = action.payload.error;
          state.user = null;
        })
     
  }

})

export const {actions, reducer} 
= userSlice

export const selectUser = (state:RootState) => state.auth.user
export default userSlice.reducer