import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; 
import AuthSlice from '../features/auth/LoginSlice'
import RegisterSlice from '../features/auth/RegisterSlice'
import CardSlice from '../features/cards/CardSlice'

const reducers = combineReducers({
    auth: AuthSlice,
    register: RegisterSlice,
    cards:CardSlice,
})

const persistConfig = {
    key: 'root',
    version:1,
    storage,
    // Specify the reducers you want to persist
    whitelist: ['auth','cards'] // In this example, we persist the 'user' reducer
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store