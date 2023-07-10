import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice'
import sheetReducer from './slicers/sheetsSlice'

// console.log('=>counter', counter)

export const store = configureStore({
    reducer: {
        user: userReducer,
        sheets: sheetReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

console.log('=>store', store)
export default store
