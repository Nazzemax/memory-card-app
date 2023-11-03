import { createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "../../app/types";
import { updateProfile } from "./ProfileActions";

const initialState:ProfileState = {
    user:null,
    isLoading:false,
    error:null
}

const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(updateProfile.pending,(state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export default profileSlice.reducer;
