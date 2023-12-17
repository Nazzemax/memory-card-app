import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService as axios } from "../../services/apiService";
import type { RegisterState, LoginState } from "../../app/types";
import { actions } from '../../features/auth/LoginSlice';

export const loginUser = async (
    email: string,
    password: string,
    rememberMe: boolean) => {
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
    async ({ email, password, rememberMe }: LoginState, thunkApi) => {
        try {
            const response = await loginUser(email, password, rememberMe);
            return response
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const registerUser = async (email: string, password: string) => {
    try {
        const request = await axios.post('/auth/register', {
            email,
            password,
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




export const logoutMe = async (dispatch: Dispatch) => {
    try {
        const request = await axios.delete('/auth/me')


        dispatch(actions.logoutUser(''));
        const response = request.data;

        return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
        throw error
    }
}


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            const dispatch = thunkApi.dispatch as Dispatch
            const response = await logoutMe(dispatch)

            return response
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }: RegisterState, thunkApi) => {
        try {
            const response = await registerUser(email, password);

            return response
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const checkCookies = async (dispatch: Dispatch) => {
    try {
        const response = await axios.post('/auth/me', {});

        if (response.status === 200) {
            dispatch(actions.setUser(response.data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        if (e.response) {
            console.log(e.response.data.error)
            return
        }
    }
};