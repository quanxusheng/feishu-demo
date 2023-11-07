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
    avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E7%8C%AB%E5%92%AA&step_word=&lid=8907415980685355964&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=3077097153,1206550634&os=1546480002,3683795844&simid=3353919163,280230208&pn=1&rn=1&di=46137345&ln=1940&fr=&fmq=1699343029754_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=11&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F907d685d2fb4917ea260fca824233fd6e340a966.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined'
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