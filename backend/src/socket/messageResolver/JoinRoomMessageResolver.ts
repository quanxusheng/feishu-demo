import { Socket } from "socket.io";
import { JoinRoomParams, ValidMessageType } from "../type";



export default function JoinRoomMessageResolver(socket: Socket, params: JoinRoomParams){
    console.log('=>JoinRoomMessageResolver-params', params)
    const {roomId, userId} = params

    socket.join(roomId)
    console.log('=进入房间了>', roomId)
    socket.to(roomId).emit('message', {
        type: ValidMessageType.JoinRoom,
        message: {
            ...params,
            // username: `匿名用户${userId}`,
        }
    })
}