import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService as axios } from "../../services/apiService";


interface AuthState {
    password: string;
    email: string;
    rememberMe: boolean;
    error?: string | null;
}

export interface ErrorResponse {
    error?: string;
}

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
    try {
        const request = await axios.post('/auth/login', {
            email,
            password,
            rememberMe
        })

        const response = request.data

        return response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
        throw error
    }
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, rememberMe }: AuthState, thunkApi) => {
        try {
            const response = await loginUser(email, password, rememberMe);

            return response
        } catch (e) {
           return thunkApi.rejectWithValue(e)
        }
    }
)