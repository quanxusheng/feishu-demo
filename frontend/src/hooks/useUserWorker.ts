import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { login as loginActionCreator, modifyUserInfo } from '../store/slicers/userSlice'
import { RootState } from '../store'

export default function useUserWorker() {
    const dispatch = useDispatch()

    const user = 
        useSelector((state:RootState) => state.user)?.userId ||
        JSON.parse(localStorage.getItem('userInfo'))

    // console.log('=>useUserWorker', user)
    
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