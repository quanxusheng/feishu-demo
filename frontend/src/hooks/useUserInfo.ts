
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState } from '../store'
import {login} from '@/store/slicers/userSlice'

export default function useUserInfo() {
    const dispatch = useDispatch()
    const to = useNavigate()
    const user = useSelector((state:RootState) => state.user)
    console.log('=>PPPpPPP', user)
    // if (!user || !user.userId) {
    //     const tempData = JSON.parse(localStorage.getItem('userInfo') || null)
    //     console.log('=>useUserInfo-tempData', tempData)
    //     if (tempData && tempData.userId) {
    //         dispatch(login(tempData))
    //         return tempData
    //     } else {
    //         to('/login')
    //     }
    // }
    // useEffect(() => {
    //     console.log('=>useUserInfo-user0000111111111', user)
    //     if (!user || !user.userId) {
    //         const tempData = JSON.parse(localStorage.getItem('userInfo') || null)
    //         console.log('=>useUserInfo-tempData', tempData)
    //         if (tempData && tempData.userId) {
    //             dispatch(login(tempData))
    //             return tempData
    //         } else {
    //             to('/login')
    //         }
    //     }
       
    // }, [dispatch, to, user])
     return {
        user
    }
}