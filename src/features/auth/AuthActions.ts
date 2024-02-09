import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterState, LoginState } from "../../app/types";
import { actions } from '../../features/auth/LoginSlice';
import { callApi } from "../../services/api";
import { redirect } from "react-router-dom";


export const loginUser = (email: string, password: string, rememberMe: boolean) =>
    callApi('post', '/auth/login', { email, password, rememberMe });

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, rememberMe }: LoginState, thunkApi) => {
        try {
            return await loginUser(email, password, rememberMe);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const registerUser = (email: string, password: string) =>
    callApi('post', '/auth/register', { email, password });

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }: RegisterState, thunkApi) => {
        try {
            const response = await registerUser(email, password);
            if (response.status === 201) {
                redirect('/home'); // Note: redirect might not work as expected here, consider a different approach for navigation.
            }
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const logoutMe = (dispatch: Dispatch) =>
    callApi('delete', '/auth/me').then((response) => {
        dispatch(actions.logoutUser(''));
        return response;
    });

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            const dispatch = thunkApi.dispatch as Dispatch;
            return await logoutMe(dispatch);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const checkCookies = (dispatch: Dispatch) =>
    callApi('post', '/auth/me', {}).then((response) => {
        if (response.status === 200) {
            dispatch(actions.setUser(response.data));
        }
    }).catch(console.error);