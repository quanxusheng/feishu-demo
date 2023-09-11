import { Socket } from "socket.io";
import { OperationMessage, OriginOperationParams, ValidMessage, ValidMessageType } from "../type";



export default function OperationMessageResolver(socket: Socket, params: OriginOperationParams) {
    console.log('=>mmmm', params)
    socket.emit('message', {
        type: ValidMessageType.Operation,
        params
    })
}