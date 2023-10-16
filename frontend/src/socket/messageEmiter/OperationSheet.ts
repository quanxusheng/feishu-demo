import {AddSheetParams} from '../types'

import socket from '@/socket/hooks/socketInit'

export default function OperationSheet(params: AddSheetParams) {
    socket.emit('addSheet', {
        params
    })
}