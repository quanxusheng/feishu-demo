
import { Socket } from "socket.io";
import { ValidMessage, ValidMessageType } from "../type";
import JoinRoomMessageResolver from './JoinRoomMessageResolver';
import OperationMessageResolver from './OperationMessageResolver';
import OperationSheetResolver from "./OperationSheetResolver";

export default function messageResolver(socket: Socket, incommingMessage: ValidMessage) {
    console.log('=message>999', incommingMessage)
    if (incommingMessage.type === ValidMessageType.JoinRoom) {
        JoinRoomMessageResolver(socket, incommingMessage.params)
    } else if (incommingMessage.type === ValidMessageType.Operation) {
        OperationMessageResolver(socket, incommingMessage.params)
    } else if (incommingMessage.type === ValidMessageType.OperationSheet) {
        OperationSheetResolver(socket, incommingMessage.params)
    }
}