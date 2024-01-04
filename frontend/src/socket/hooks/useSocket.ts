import { useCallback, useEffect } from 'react'


import socket from "./socketInit";
import { JoinRoomParams, ValidMessage, ValidMessageType } from '../types';

import { JoinRoomEmiter, OperationEmiter } from '../messageEmiter';

import useUserWorker from '@/hooks/useUserWorker';

import useUrlParams from '@/hooks/useUrlParams';

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'

import useApplyAddSheet from './triggerEvent/useApplyAddSheet'

import { checkRoomVersion, enableSocketQueue } from '@/socket/socketQueue'


export default function useSocket() {

    const { user } = useUserWorker()
    const { roomInfo, userJoinRoomDispatcher } = useWorkInProgressWorker()
    // console.log('=>roomInfo', roomInfo)
    // const { updataTableDispather } = useSheets()
    const { sheetUrlParams } = useUrlParams()
    const { applyOriginAddSheetOperation, updataTableDispather } = useApplyAddSheet()

    


    const joinRoomMessageResolver = useCallback((message: JoinRoomParams) => {
        userJoinRoomDispatcher(message)
    },[userJoinRoomDispatcher]
)
    // const applyOriginAddSheet = (params) => {
    //     useApplyAddSheet(params)
    // }

    const watchSocketEvents = useCallback(() => {
        socket.on('message', (incommingMessage: ValidMessage) => {
            console.log('=>客户端接收到了', incommingMessage)
            const { type, params } = incommingMessage
            if (type === ValidMessageType.VersionConfirm) {
                checkRoomVersion(params)
            }
            if (type === ValidMessageType.JoinRoom) {
                joinRoomMessageResolver(params)
            } else if (type === ValidMessageType.Operation) {
                updataTableDispather(params)
            } else if (type === ValidMessageType.OperationSheet) {
                applyOriginAddSheetOperation(params)
            }
        })
        socket.on("disconnect", (reason) => {
            // console.log('=>disconnect', reason)
        });
    },[applyOriginAddSheetOperation, joinRoomMessageResolver, updataTableDispather])

    const startConnect = useCallback(() => {
        try {
            socket.connect()

            // 1.触发joinRoom事件
            // 2.监听服务端的推送
            // 3.开启滞留operation队列
            JoinRoomEmiter({ ...user, sheetId: sheetUrlParams.sheetId })
            watchSocketEvents()
            enableSocketQueue()

        } catch (error) {
            console.log('=>startConnect', error)
        }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    }, [user, sheetUrlParams.sheetId, watchSocketEvents])

    useEffect(() => {
        // console.log('=>111', socket)
        if (socket.connected) return
        startConnect()
    }, [startConnect])

    return {
    }

}


