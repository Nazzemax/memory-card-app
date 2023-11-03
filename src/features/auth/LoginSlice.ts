import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { User } from "../../app/types";
import { login, logout } from "./AuthActions";
import { toast } from "react-toastify";
import { updateProfile } from "../profile/ProfileActions";

const initialState: User = {
  user: {
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
  isLoading: false,
  isAuthenticated: false,
}

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.user.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null
    },
    updateUser:(state, action:PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
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
          state.user = action.payload
          toast.success('Successfully logged in')
        })
      .addCase(login
        .rejected, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user.error = action.error.message
          toast.error('Your login or password is incorrect')
        })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticated = true
        state.isLoading = false
        state.user.error = action.error.message
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.avatar = action.payload.avatar;
      });
  }

})

export const { actions, reducer }
  = loginSlice

export const selectUser = (state: RootState) => state.auth.user

export default loginSlice.reducer