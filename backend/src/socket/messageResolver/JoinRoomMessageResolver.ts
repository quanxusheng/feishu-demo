import { Socket } from "socket.io";
import { JoinRoomParams, ValidMessageType } from "../type";



export default function JoinRoomMessageResolver(socket: Socket, params: JoinRoomParams){
    const {roomId, userId, username} = params
    
    socket.join(roomId)
    
    socket.to(roomId).emit('message', {
        type: ValidMessageType.JoinRoom,
        message: {
            ...params,
            username: `${username}${userId.slice(0, 2)}`,
        }
    })
}