import { useCallback, useEffect } from 'react'


import socket from "./socketInit";
import { JoinRoomParams, ValidMessage, ValidMessageType } from '../types';

import { JoinRoomEmiter, OperationEmiter } from '../messageEmiter';

import useUserWorker from '@/hooks/useUserWorker';

import useSheets from '@/hooks/useSheet';

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'

import useApplyAddSheet from './triggerEvent/useApplyAddSheet'

import { checkRoomVersion, enableSocketQueue } from '@/socket/socketQueue'


export default function useSocket() {

    const { user } = useUserWorker()
    const { roomInfo, userJoinRoomDispatcher } = useWorkInProgressWorker()
    // console.log('=>roomInfo', roomInfo)
    const { sheetUrlParams, updataSheetDispather } = useSheets()
    const { applyOriginAddSheetOperation } = useApplyAddSheet()

    const startConnect = () => {
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
    }


    const joinRoomMessageResolver = (message: JoinRoomParams) => {
        userJoinRoomDispatcher(message)
    }

    // const applyOriginAddSheet = (params) => {
    //     useApplyAddSheet(params)
    // }

    const watchSocketEvents = () => {
        socket.on('message', (incommingMessage: ValidMessage) => {
            console.log('=>客户端接收到了', incommingMessage)
            const { type, params } = incommingMessage
            if (type === ValidMessageType.VersionConfirm) {
                checkRoomVersion(params)
            }
            if (type === ValidMessageType.JoinRoom) {
                joinRoomMessageResolver(params)
            } else if (type === ValidMessageType.Operation) {
                // dispatch(updataSheet({...omit(payload, 'destroyAtomComponent'), ...sheetUrlParams}))
                updataSheetDispather(params)
            } else if (type === ValidMessageType.OperationSheet) {
                applyOriginAddSheetOperation(params)
            }
        })
        socket.on("disconnect", (reason) => {
            // console.log('=>disconnect', reason)
        });
    }


    useEffect(() => {
        // console.log('=>111', socket)
        if (socket.connected) return
        startConnect()
    })

    return {
    }

}


