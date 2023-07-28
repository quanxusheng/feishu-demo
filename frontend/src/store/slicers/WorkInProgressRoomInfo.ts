import {createSlice} from '@reduxjs/toolkit'
import { Key } from 'react'

export interface WorkInProgressRoomInfoType {
    roomId: string
    onlineUsers: Set<Object>
    roomVersion: Key
}


const initialState: WorkInProgressRoomInfoType = {
    roomId: '',
    onlineUsers: new Set(),
    roomVersion: 0
}

const roomSlicer = createSlice({
    initialState,
    name: 'roomInfo',
    reducers: {
        initRoom: (state, action) => {
            state.roomId = action.payload
        },
        resetRoom: (state) => {
            state.roomId = ''
            state.onlineUsers.clear()
        },
        userJoinRoom: (state, action) => {
            state.onlineUsers.add(action.payload)
        },
        updateRoomVersion: (state, action) => {
            state.roomVersion = action.payload
        }
    }
})

export const { initRoom, resetRoom, userJoinRoom, updateRoomVersion } = roomSlicer.actions
export default roomSlicer.reducer