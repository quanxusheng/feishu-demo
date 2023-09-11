import socket from "../hooks/socketInit";
import { ValidMessageType, OriginOperationParams } from "../types";


export default function OperationMessageEmiter(params: OriginOperationParams) {
    socket.emit('message', {
        type: ValidMessageType.Operation,
        params
    })

}