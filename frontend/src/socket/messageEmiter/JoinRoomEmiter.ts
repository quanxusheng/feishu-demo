import { ValidMessageType } from "../types";

import { JoinRoomParams } from "../types";

import socket from "../hooks/socketInit";

export default function JoinRoomEmiter(params: JoinRoomParams) {
    socket.emit('message', {
        type: ValidMessageType.JoinRoom,
        params
    })
}