import { createSlice } from "@reduxjs/toolkit";
import type { Cards } from "../../app/types";
import { getCards } from "./CardActions";

const initialState:Cards = {
    cardPacks:[{
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created:  '',
        updated: '',
        user_name:'',
    }],
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 10,
    minCardsCount: 2,
    page: 1,
    pageCount: 10,
    isLoading:false,
    error:'',
    packName:'',
    isSorted:''
}

const cardSlice = createSlice({
    name:'cards',
    initialState,
    reducers:{
        setMaxCards:(state, action) => {
            state.maxCardsCount = action.payload
        },
        setMinCards:(state, action) => {
            state.minCardsCount = action.payload
        },
        setPage:(state, action) => {
            state.page = action.payload
        },
        setItemsPerPage:(state, action) => {
            state.pageCount = action.payload
        },
        setPackName:(state, action) => {
            state.packName = action.payload
        },
        setSorting:(state, action) => {
            state.isSorted = action.payload
        }
    },
    extraReducers:builder => {
        builder
            .addCase(getCards.pending, (state => {
                state.isLoading = true;
                state.error = ''
            }))
            .addCase(getCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ''
                state.cardPacks = action.payload.cardPacks
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            })
            .addCase(getCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error with getting cards'
            })
    }

})

export const {actions, reducer} = cardSlice

export default cardSlice.reducer