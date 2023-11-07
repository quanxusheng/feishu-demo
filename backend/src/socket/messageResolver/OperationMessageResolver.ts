import { Socket } from "socket.io";
import { OperationMessage, OriginOperationParams, ValidMessage, ValidMessageType } from "../type";



export default function OperationMessageResolver(socket: Socket, params: OriginOperationParams) {

    console.log('=>mmmm', params)
    // socket.join(params.payload.roomId)
    console.log('=>rooms', socket.rooms)
    const roomId = params.payload.roomId


    socket.emit('message', {
    // socket.to(roomId).emit('message', {
        type: ValidMessageType.Operation,
        params
    })
    socket.to(roomId).emit('message', {
        type: ValidMessageType.Operation,
        params
    })
}