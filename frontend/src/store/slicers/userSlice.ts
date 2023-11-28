import { createSlice } from '@reduxjs/toolkit'
import {v4 as uuid } from 'uuid'

export interface User {
    userId: string
    username: string
    email: string
    avatar: string
}

const initialState: User = {
    userId: '',
    username: '',
    email: '',
    avatar: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log('=>login-action', action)

            Object.assign(state, action.payload)
            localStorage.setItem('userId', action.payload.userId)
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },

        modifyUserInfo: (state, action) => {
            // console.log('=>modifyUserInfo', state)
            // console.log('=>modifyUserInfo-action', action)
            // state = { ...state, ...action.payload}
            // state.username = action.payload.username
            // state.userId = action.payload.userId
            Object.assign(state, action.payload)
        },
        
        logout: () => {

        }
    }
})
// console.log('=>userSlice', userSlice)

export const { login, logout, modifyUserInfo } = userSlice.actions
export default userSlice.reducer