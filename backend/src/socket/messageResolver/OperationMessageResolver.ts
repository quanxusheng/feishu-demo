import { Socket } from "socket.io";
import { OperationMessage, OriginOperationParams, ValidMessage, ValidMessageType } from "../type";



export default function OperationMessageResolver(socket: Socket, params: OriginOperationParams) {

    console.log('=>mmmm', params)
    // socket.join(params.payload.sheetId)
    // console.log('=>rooms', socket.rooms)
    const sheetId = params.payload.sheetId


    socket.emit('message', {
        type: ValidMessageType.Operation,
        params
    })
    socket.to(sheetId).emit('message', {
        type: ValidMessageType.Operation,
        params
    })
}