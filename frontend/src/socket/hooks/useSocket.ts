import { useCallback, useEffect } from 'react'


import socket from "./socketInit";
import { JoinRoomParams, ValidMessage, ValidMessageType } from '../types';

import { JoinRoomEmiter, OperationEmiter } from '../messageEmiter';

import useUserWorker from '@/hooks/useUserWorker';

import useSheets from '@/hooks/useSheets';

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'


export default function useSocket() {

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
    

    const joinRoomMessageResolver = (message: JoinRoomParams) => {
        userJoinRoomDispatcher(message)
    }

    const watchSocketEvents = () => {
        socket.on('message', (incommingMessage: ValidMessage) => {
            console.log('=>incommingMessage', incommingMessage)
            if (incommingMessage.type === ValidMessageType.JoinRoom) {
                joinRoomMessageResolver(incommingMessage.message)
            } else if (incommingMessage.type === ValidMessageType.Operation) {
                // OperationEmiter(incommingMessage)
            }
        })
    }

    useEffect(() => {
        console.log('=>111', socket)
        if (socket.connected) return
        startConnect()
    })
    


    return {
    }

}


