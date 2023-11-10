import {useDispatch, useSelector} from 'react-redux'
import { login as loginActionCreator, modifyUserInfo } from '../store/slicers/userSlice'
import { RootState } from '../store'

export default function useUserWorker() {
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()
    const login = (args) => {
        const userId = localStorage.getItem('userId')
        !userId && dispatch(loginActionCreator(args))
    }
    const modify = (args) => {
        dispatch(modifyUserInfo(args))
    }
    return {
        user,
        login,
        modify
    }
}