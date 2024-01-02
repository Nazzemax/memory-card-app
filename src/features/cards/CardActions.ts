import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService as axios } from '../../services/apiService'
import { CardParams, CardsParams, IPostCardPack, CardPack, ICards } from "../../app/types"
import { AxiosError } from "axios"

export const getPackCards = createAsyncThunk(
    'get/cards',
    async (queryParams: CardsParams, thunkApi) => {
        try {
            const cards = await axios.get('/cards/pack', { params: queryParams })
            return cards.data
        } catch (e) {
            if (AxiosError<typeof e>) {
                const axiosError = e as AxiosError
                return thunkApi.rejectWithValue({
                    message: axiosError.message,
                });
            }
            return thunkApi.rejectWithValue({
                message: 'An unexpected error occurred',
            });
        }
    }
)

export const addCardPack = createAsyncThunk(
    'post/cards/pack',
    async ({ name, deckCover, private: isPrivate }: IPostCardPack, thunkApi) => {
        try {
            const result = await axios.post('/cards/pack', { cardsPack: { name, deckCover, isPrivate } })

            return result.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const deleteCardPack = createAsyncThunk(
    'delete/cards/pack',
    async (id: string, thunkApi) => {
        try {
            const result = await axios.delete(`/cards/pack?id=${id}`)

            return result.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const updateCardPack = createAsyncThunk(
    'put/cards/pack',
    async ({_id, name}:CardPack, thunkApi) => {
      try {
        const result = await axios.put(`/cards/pack`, { cardsPack:{_id, name} });
        return result.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

export const getCard = createAsyncThunk(
    'get/card',
    async (queryParams: CardParams, thunkApi) => {
        try {
            const card = await axios.get('/cards/card', { params: queryParams })
            return card.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const addCard = createAsyncThunk(
    'post/cards/card',
    async ({ cardsPack_id, answer, question }: ICards, thunkApi) => {
        try {
            const result = await axios.post('/cards/card', { card: { cardsPack_id, answer, question } })

            return result.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const deleteCard = createAsyncThunk(
    'delete/cards/card',
    async (id: string, thunkApi) => {
        try {
            const result = await axios.delete(`/cards/card?id=${id}`)

            return result.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const updateCard = createAsyncThunk(
    'put/cards/card',
    async ({_id, answer, question}:ICards, thunkApi) => {
      try {
        const result = await axios.put(`/cards/card`, { card:{_id, answer, question} });
        return result.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );

  export const updateGrade = createAsyncThunk(
    'put/cards/grade',
    async ({grade, cardsPack_id}:ICards, thunkApi) => {
      try {
        const result = await axios.put(`/cards/card`, { grade, cardsPack_id});
        return result.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );


