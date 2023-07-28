import { Socket } from "socket.io";
import { JoinRoomParams, ValidMessageType } from "../type";



export default function JoinRoomMessageResolver(socket: Socket, params: JoinRoomParams){
    const {roomId, userId} = params

    socket.join(roomId)

    socket.to(roomId).emit('message', {
        type: ValidMessageType.JoinRoom,
        message: {
            ...params,
            username: `匿名用户${userId}`,
        }
    })
}