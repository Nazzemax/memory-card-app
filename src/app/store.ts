import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'

const reducers = combineReducers({
    auth:AuthSlice,
})

const store = configureStore({
   reducer:reducers,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store