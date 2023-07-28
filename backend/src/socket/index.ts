import { Socket } from "socket.io";
import { ValidMessage } from "./type";
import messageResolver from "./messageResolver";

export default function socketConnectionResolver(socket: Socket) {
    socket.on('message', (message: ValidMessage) => messageResolver(socket, message))
}