import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Cards } from "../../app/types";
import { getPackCards, addCardPack, getCard, deleteCardPack, updateCardPack, addCard, deleteCard, updateCard } from "./CardActions";

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
    cards:[
        {
            question:'',
            answer: '',
            cardsPack_id: '',
            grade: 0, // средняя оценка карточек
            shots: 0, // количество попыток
            user_id: '',
            created: '',
            updated: '',
            _id: '',
            answerImg: '', // не обязателен
            questionImg: '', // не обязателен
            questionVideo: '', // не обязателен
            answerVideo:'', // не обязателен
        }
    ],
    cardPacksTotalCount: 0, // количество колод
    cardsTotalCount:0,
    maxCardsCount: 10,
    minCardsCount: 2,
    page: 1,
    pageCount: 10,
    isLoading:false,
    error:'',
    packName:'',
    isSorted:'',
    cardQuestion:'',
    minGrade:0,
    maxGrade:4,
    packUserId:'',
    grade:0,
    name:'',
    toggleState:'All',
    id:''
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
        },
        setQuestionName:(state, action) => {
            state.cardQuestion = action.payload
        },
        setRating:(state, action) => {
            state.grade = action.payload
        },
        setToggleState:(state, action:PayloadAction<'My' | 'All'>) => {
            state.toggleState = action.payload
        },
        setUserId:(state, action) => {
            state.id = action.payload
        }
    },
    extraReducers:builder => {
        builder
            .addCase(getPackCards.pending, (state => {
                state.isLoading = true;
            }))
            .addCase(getPackCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ''
                state.cardPacks = action.payload.cardPacks
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            })
            .addCase(getPackCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error with getting cards'
            })
            .addCase(getCard.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = action.payload.cards;
                state.page = action.payload.page;
                state.pageCount = action.payload.pageCount;
                state.minGrade = action.payload.minGrade;
                state.maxGrade = action.payload.maxGrade;
                state.cardsTotalCount = action.payload.cardsTotalCount;
                state.name = action.payload.packName;
            })
            .addCase(getCard.rejected, (state, action) => {
                state.error = action.error.message || 'Error while getting cards'
                state.isLoading = false
            })
            .addCase(addCardPack.pending, state => {
                state.isLoading = true
            })
            .addCase(addCardPack.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addCardPack.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error while adding a card pack'
            })
            .addCase(deleteCardPack.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteCardPack.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(deleteCardPack.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error while removing a card pack'
            })
            .addCase(updateCardPack.pending, state => {
                state.isLoading = true
            })
            .addCase(updateCardPack.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(updateCardPack.rejected, (state, action)=> {
                state.isLoading = false;
                state.error = action.error.message || 'Error while updating a card pack'
            })
            .addCase(addCard.pending, state => {
                state.isLoading = true;
            })
            .addCase(addCard.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(addCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error with adding card';
            })
            .addCase(deleteCard.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteCard.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error with adding card';
            })
            .addCase(updateCard.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateCard.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(updateCard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error with adding card';
            })
    }
})

export const {actions, reducer} = cardSlice

export default cardSlice.reducer