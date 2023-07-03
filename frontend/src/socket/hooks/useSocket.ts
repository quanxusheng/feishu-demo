import socket from "./socketInit";
import { useCallback, useEffect } from 'react'


export default function useSocket() {

    const socketConnetCallback = useCallback(() => {
        console.log('=>socket连接成功')
    }, [])

    const socketDisConnectCallback = useCallback((reason) => {
        console.log('=>disconnect-reason', reason)
    }, [])

    const socketMessageCommingCallBack = useCallback((message) => {
        console.log('=>message', message)
    }, [])

    useEffect(() => {
        socket.on('connect', socketConnetCallback)

        socket.on('disconnect', socketDisConnectCallback)

        socket.on('message', socketMessageCommingCallBack)

        return () => {
            socket.off('connect', socketConnetCallback)
            socket.off('disconnect', socketDisConnectCallback)
            socket.off('message', socketMessageCommingCallBack)
        }
    }, [])

    const submitNewVersion = useCallback(() => {
        console.log('=>submitNewVersion', socket)
        socket.emit('message', {
            version: 2,
            delete: 'hello',
            insert: 'hello world'
        })
    }, [])

    return {
        submitNewVersion
    }

}


