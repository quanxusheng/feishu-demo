import { useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { login as loginActionCreator, modifyUserInfo } from '../store/slicers/userSlice'
import { RootState } from '../store'

export default function useUserWorker() {
    const dispatch = useDispatch()
    const to = useNavigate()

    let userState = useSelector((state:RootState) => state.user)
    // console.log('=>userState444', userState)

    const user = useMemo(() => {
        const localUserInfo = JSON.parse(localStorage.getItem('userInfo')) || null
        if ((!userState || !userState.userId)) {
            dispatch(loginActionCreator(localUserInfo))
            return localUserInfo
        }
        return userState
    }, [dispatch, userState])
        

    // console.log('=>useUserWorker333', user)

    // useEffect(() => {
    //     alert(1)
    //     console.log('=>useUserWorker11', user)
    //     if (!user || !user.userId) {
    //         to('/login')
    //     }
    // }, [to, user])
    
    const dispatchLogin = useCallback((args) => {
        // const userId = localStorage.getItem('userId')
        // !userId && dispatch(loginActionCreator(args))

        dispatch(loginActionCreator(args))
    }, [dispatch])
    
    const modify = (args) => {
        dispatch(modifyUserInfo(args))
    }
    return {
        user,
        dispatchLogin,
        modify
    }
}