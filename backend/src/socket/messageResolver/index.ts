
import { Socket } from "socket.io";
import { ValidMessage, ValidMessageType } from "../type";
import JoinRoomMessageResolver from './JoinRoomMessageResolver'


export default function messageResolver(socket: Socket, incommingMessage: ValidMessage) {
    console.log('=message>', incommingMessage)
    if (incommingMessage.type === ValidMessageType.JoinRoom) {
        JoinRoomMessageResolver(socket, incommingMessage.message)
    }
}