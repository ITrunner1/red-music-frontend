import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { userSlice } from "./user/user.slice"
import { api } from "./api/api"
import { rtkQueryErrorLogger } from "./middleware"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { filtersSlice } from './filters/filters.slice'

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({   
    [api.reducerPath]: api.reducer, 
    user: userSlice.reducer,
    filters: filtersSlice.reducer,
})

let mainReducer = combinedReducers

if(isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require("redux-persist/lib/storage").default

    const persistConfig = {
        key: 'red-music',
        storage,
        whitelist: ['user', 'filters']
    }

   mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(rtkQueryErrorLogger).concat(api.middleware)
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>