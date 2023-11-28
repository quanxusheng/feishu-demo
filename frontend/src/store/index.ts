import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slicers/userSlice'
import sheetReducer from './slicers/sheetSlice'
import roomReducer from './slicers/WorkInProgressRoomInfo'

export const store = configureStore({
    reducer: {
        user: userReducer,
        sheet: sheetReducer,
        workInProgressRoomInfo: roomReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store
