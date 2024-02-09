import { createAsyncThunk } from "@reduxjs/toolkit"
import { callApi } from "../../services/api"
import { CardParams, CardsParams, IPostCardPack, CardPack, ICards } from "../../app/types"

export const getPackCards = createAsyncThunk(
    'get/cards',
    async (queryParams: CardsParams, thunkApi) => {
        try {
            return await callApi('get', '/cards/pack', { params: queryParams });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const addCardPack = createAsyncThunk(
    'post/cards/pack',
    async (data: IPostCardPack, thunkApi) => {
        try {
            return await callApi('post', '/cards/pack', { data });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const deleteCardPack = createAsyncThunk(
    'delete/cards/pack',
    async (id: string, thunkApi) => {
        try {
            return await callApi('delete', `/cards/pack?id=${id}`);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const updateCardPack = createAsyncThunk(
    'put/cards/pack',
    async ({ _id, name }: CardPack, thunkApi) => {
        try {
            return await callApi('put', '/cards/pack', { data: { cardsPack: { _id, name } } });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const getCard = createAsyncThunk(
    'get/card',
    async (queryParams: CardParams, thunkApi) => {
        try {
            return await callApi('get', '/cards/card', { params: queryParams });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const addCard = createAsyncThunk(
    'post/cards/card',
    async (data: ICards, thunkApi) => {
        try {
            return await callApi('post', '/cards/card', { data: { card: data } });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const deleteCard = createAsyncThunk(
    'delete/cards/card',
    async (id: string, thunkApi) => {
        try {
            return await callApi('delete', `/cards/card?id=${id}`);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const updateCard = createAsyncThunk(
    'put/cards/card',
    async (data: ICards, thunkApi) => {
        try {
            return await callApi('put', '/cards/card', { data: { card: data } });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const updateGrade = createAsyncThunk(
    'put/cards/grade',
    async (data: Pick<ICards, 'grade' | 'cardsPack_id'>, thunkApi) => {
        try {
            return await callApi('put', '/cards/grade', { data });
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);