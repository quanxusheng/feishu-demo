import {AddTableParams, ValidMessageType} from '../types'

import socket from '@/socket/hooks/socketInit'

export default function OperationSheet(params: AddTableParams) {
    socket.emit('message', {
        type: ValidMessageType.OperationSheet,
        params
    })
}