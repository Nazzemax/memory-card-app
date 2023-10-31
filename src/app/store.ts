import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/LoginSlice'
import RegisterSlice from '../features/auth/RegisterSlice'

const reducers = combineReducers({
    auth: AuthSlice,
    register: RegisterSlice,
})

const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store