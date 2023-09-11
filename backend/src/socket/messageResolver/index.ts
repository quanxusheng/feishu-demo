
import { Socket } from "socket.io";
import { ValidMessage, ValidMessageType } from "../type";
import JoinRoomMessageResolver from './JoinRoomMessageResolver';
import OperationMessageResolver from './OperationMessageResolver';


export default function messageResolver(socket: Socket, incommingMessage: ValidMessage) {
    console.log('=message>999', incommingMessage)
    if (incommingMessage.type === ValidMessageType.JoinRoom) {
        JoinRoomMessageResolver(socket, incommingMessage.message)
    } else if (incommingMessage.type === ValidMessageType.Operation) {
        OperationMessageResolver(socket, incommingMessage.message)
    }
}