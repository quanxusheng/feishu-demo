
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'

import { userJoinRoom } from '@/store/slicers/WorkInProgressRoomInfo'
import { useCallback } from 'react'


export default function useWorkInProgressWorker() {

    const dispatch = useDispatch()
    const roomInfo = useSelector((state: RootState) => state.workInProgressRoomInfo)

    const userJoinRoomDispatcher = useCallback((payload) => {
        dispatch(userJoinRoom({
            ...payload
        }))
    }, [dispatch])



    return {
        roomInfo,
        userJoinRoomDispatcher
    }
}