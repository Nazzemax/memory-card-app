import { createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "../../app/types";
import { register } from "./AuthActions";
import { toast } from "react-toastify";

const initialState: UserRegister = {
  email: '',
  password: '',
  isSuccess: false,
  isLoading: false,
  error: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register
        .pending, state => {
          state.isLoading = true;
          state.isSuccess = false;
        })
      .addCase(register
        .fulfilled, (state, _) => {
          state.isLoading = false;
          state.isSuccess = true;
          toast.success('Successfully registered')
        })
      .addCase(register
        .rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.error = action.error.message;
        })
  }
})


export const { actions, reducer }
  = registerSlice

export default registerSlice.reducer