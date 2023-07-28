import { useCallback, useEffect } from 'react'


import socket from "./socketInit";
import { ValidMessage, ValidMessageType } from '../types';

import { JoinRoomEmiter } from '../messageEmiter';

import useUserWorker from '@/hooks/useUserWorker';

import useSheets from '@/hooks/useSheets';

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'


export default function useSocket(shouldInit: boolean = false) {

    const { user } = useUserWorker()
    const { roomInfo, userJoinRoomDispatcher } = useWorkInProgressWorker()
    console.log('=>roomInfo', roomInfo)
    const { sheetUrlParams: { roomId } } = useSheets()


    const startConnect = () => {
        try {
            socket.connect()

            // 1.出发joinRoom事件
            // 2.监听服务端的推送
            // 3.开启滞留operation队列
            JoinRoomEmiter({...user, roomId})
            watchSocketEvents()

        } catch (error) {
            console.log('=>startConnect', error)
        }
    }

    const joinRoomMessageResolver = useCallback((message) => {
        userJoinRoomDispatcher(message)
    }, [userJoinRoomDispatcher])

    const watchSocketEvents = () => {
        socket.on('message', (incommingMessage: ValidMessage) => {
            console.log('=>incommingMessage', incommingMessage)
            if (incommingMessage.type === ValidMessageType.JoinRoom) {
                joinRoomMessageResolver(incommingMessage.message)
            }
        })
    }

    useEffect(() => {
        if (!shouldInit) return
        startConnect()
    })


    return {
    }

}


