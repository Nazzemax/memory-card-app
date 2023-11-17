import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService as axios } from '../../services/apiService'
import { CardParams, CardsParams } from "../../app/types"
import { AxiosError } from "axios"

export const getCards = createAsyncThunk(
    'get/cards',
    async (queryParams:CardsParams, thunkApi) => {
        try {
            const cards = await axios.get('/cards/pack', {params:queryParams})
            return cards.data
        } catch(e) {
            if (AxiosError<typeof e>) {
                return thunkApi.rejectWithValue({
                  message: e.message,
                });
              }
              return thunkApi.rejectWithValue({
                message: 'An unexpected error occurred',
              });
        }
    }
)

export const getCard = createAsyncThunk(
    'get/card',
    async(queryParams:CardParams, thunkApi) => {
        try {
            const card = await axios.get('/cards/card',{params:queryParams})
            return card.data
        }catch(e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)