import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService as axios } from "../../services/apiService"
import { ProfileFormData } from "../../app/types"

export const updateProfile = createAsyncThunk(
    'auth/me',
    async ({name, avatar}:ProfileFormData, { rejectWithValue }) => {
        try {
            const response = await axios.put('/auth/me', {
                name,
                avatar
            },{
                headers:{
                    "Content-Type":'application/json',
                },
            });
            return response.data.updatedUser
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(e:any) {
            return rejectWithValue(e.response.data)
        }
    } 
)
