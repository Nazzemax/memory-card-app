import { Slice, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { LoginState } from "../../app/types";
import { login, logout } from "./AuthActions";
import { toast } from "react-toastify";
import { updateProfile } from "../profile/ProfileActions";
import { PURGE } from "redux-persist";


const initialState: LoginState = {
  user: {
    user: {
      _id: '',
      email: '',
      name: '',
      avatar: '',
      publicCardPacksCount: 0,
      created: '',
      updated: '',
      isAdmin: false,
      verified: false,
      rememberMe: false
    },
    isLoading: false,
    isAuthenticated: false,
  },
  password: '',
  email: '',
  rememberMe: false,
  error: '',
  isLogout: false
}

const loginSlice: Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.user = action.payload;
      state.user.isAuthenticated = true;
    },
    setError: (state, action) => {
      state.user.error = action.payload;
    },
    logoutUser: (state) => {
      state.user.user = initialState.user
      state.user.isAuthenticated = false
      state.isLogout = true
    },
    updateUser: (state, action) => {
      state.user.user = action.payload;
      state.user.isAuthenticated = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login
        .pending, state => {
          if (state.user) {
            state.user.isLoading = true;
            state.user.isAuthenticated = false;
          }

        })
      .addCase(login
        .fulfilled, (state, action) => {
          if (state.user) {
            state.user.isLoading = false;
            state.user.isAuthenticated = true;
            state.user.user = action.payload
            toast.success('Successfully logged in')
          }
        })
      .addCase(login
        .rejected, (state, action) => {
          if (state.user) {
            state.user.isLoading = false;
            state.user.isAuthenticated = false;
            state.error = action.error.message
            toast.error('Your login or password is incorrect')
          }

        })
      .addCase(logout.fulfilled, state => {
        if(state.user) {
          state = { ...initialState, isLogout: true };
        }
      })
      .addCase(PURGE, () => initialState)
      .addCase(logout.rejected, (state, action) => {
        if (state.user) {
          state.user.isAuthenticated = false
          state.user.isLoading = false
          state.error = action.error.message
        }

      })
      .addCase(updateProfile.pending, state => {
        if (state.user)
          state.user.isLoading = true;
        state.error = ''
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.isLoading = false;
          state.user.user = action.payload;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        if (state.user) {
          state.error = action.error.message;
          state.user.isLoading = false;
        }
      })
  }

})

export const { actions, reducer }
  = loginSlice

export const selectUser = (state: RootState) => state.auth.user.user

export default loginSlice.reducer