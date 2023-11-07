import { Socket } from "socket.io";
import { JoinRoomParams, ValidMessageType } from "../type";

const online_user_list:any = {}

export default function JoinRoomMessageResolver(socket: Socket, params: JoinRoomParams){
    // console.log('=>8888', params)
    const {roomId, userId, username, avatar} = params
    online_user_list[userId] = {
        userId,
        username,
        avatar
    }
    // console.log('=>111', console.log(socket.conn.transport))
    // console.log('=>socket.adaptclienter', socket.client)
    console.log('=>socket.rooms', socket.rooms)
    // console.log('=>socket.rooms', socket.rooms.get(roomId))
    socket.join(roomId)
    socket.to(roomId).emit('message', {
        type: ValidMessageType.JoinRoom,
        params: {
            ...params,
            username: `${username}${userId.slice(0, 2)}`,
            online_user_list: Object.values(online_user_list)
        }
    })
}