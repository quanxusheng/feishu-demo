import { createSlice } from '@reduxjs/toolkit'
import {v4 as uuid } from 'uuid'

export interface User {
    userId: string
    username: string
    avatar: string
}
const getUserName =() => {
    const arr = ['林国瑞','林玟书','林雅南','江奕云','刘柏宏','阮建安','夏志豪', '吉茹定', '黄文隆', '林子帆']
    return arr[(Math.random() * 10).toFixed()]
}

const initialState: User = {
    // username: Math.random() > 0.5 ? '一元' : '鲸鱼',
    username: getUserName(),
    userId: uuid(),
    avatar: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        modifyUserInfo: (state, action) => {
            // console.log('=>modifyUserInfo', state)
            // console.log('=>modifyUserInfo-action', action)
            // state = { ...state, ...action.payload}
            // state.username = action.payload.username
            // state.userId = action.payload.userId
            Object.assign(state, action.payload)
            
        },
        login: (state, action) => {
            console.log('=>login-state', state)
            console.log('=>login-action', action)
            Object.assign(state, action.payload)
        },
        logout: () => {

        }
    }
})
// console.log('=>userSlice', userSlice)

export const { login, logout, modifyUserInfo } = userSlice.actions
export default userSlice.reducer