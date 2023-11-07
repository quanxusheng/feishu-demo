
import {Socket} from 'socket.io'
import { ValidMessageType, AddSheetParams } from '../type'

export default function OperationMessageResolver(socket:Socket, params:AddSheetParams) {
    socket.to(params.roomId).emit('message',{
        type: ValidMessageType.OperationSheet,
        params
    })

    socket.emit('message', {
        type: ValidMessageType.VersionConfirm,
        params: params.roomVersion
    })
}