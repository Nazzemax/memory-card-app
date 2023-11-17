import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/LoginSlice'
import RegisterSlice from '../features/auth/RegisterSlice'
import CardSlice from '../features/cards/CardSlice'

const reducers = combineReducers({
    auth: AuthSlice,
    register: RegisterSlice,
    cards:CardSlice,
})

const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store