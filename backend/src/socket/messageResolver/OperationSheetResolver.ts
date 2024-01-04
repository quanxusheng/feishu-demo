
import {Socket} from 'socket.io'
import { ValidMessageType, AddTableParams } from '../type'

export default function OperationSheetResolver(socket:Socket, params:AddTableParams) {
    // socket.to(params.sheetId).emit('message',{
    //     type: ValidMessageType.OperationSheet,
    //     params
    // })
    console.log('=>', 'pppp')
    socket.emit('message', {
        type: ValidMessageType.VersionConfirm,
        params: params.roomVersion
    })
    socket.emit('message', {
        type: ValidMessageType.OperationSheet,
        params
    })
}