import {AddSheetParams, ValidMessageType} from '../types'

import socket from '@/socket/hooks/socketInit'

export default function OperationSheet(params: AddSheetParams) {
    socket.emit('message', {
        type: ValidMessageType.OperationSheet,
        params
    })
}