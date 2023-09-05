import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Key } from 'react'

interface onlineUsersType {
    userId: Key
    avatar: Key
    username: Key
}
export interface WorkInProgressRoomInfoType {
    roomId: string
    onlineUsers: onlineUsersType[]
    roomVersion: Key
}


const initialState: WorkInProgressRoomInfoType = {
    roomId: '',
    onlineUsers: [],
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
            state.onlineUsers = []
        },
        userJoinRoom: (state, action: PayloadAction<onlineUsersType>) => {
            console.log('=>userJoinRoom', action)
            state.onlineUsers = [
                    ...state.onlineUsers,
                    action.payload
                ]
            // if (!state.onlineUsers.find(item => item.userId !== action.payload.userId)) {
            //     state.onlineUsers = [
            //         ...state.onlineUsers,
            //         action.payload
            //     ]
            // }
            // state.onlineUsers.add(action.payload)
        },
        updateRoomVersion: (state, action) => {
            state.roomVersion = action.payload
        }
    }
})

export const { initRoom, resetRoom, userJoinRoom, updateRoomVersion } = roomSlicer.actions
export default roomSlicer.reducer