import { Socket } from "socket.io";
import { OperationMessage, OriginOperationParams, ValidMessage, ValidMessageType } from "../type";

import sheetSchema from '../../db/sheet'



export default async function OperationMessageResolver(socket: Socket, params: OriginOperationParams) {

    console.log('=>mmmm', params)
    // socket.join(params.payload.sheetId)
    // console.log('=>rooms', socket.rooms)
    const {sheetId, tableId} = params.payload
     const sheet = await sheetSchema.findOne({id: sheetId})
    const table = sheet?.tableList.find(f => f.id === tableId)
    const row = table?.rows.find(r => r.id === params.path[0])
    const col = row?.columns.find(c => c.id === params.path[1])
    col && (col.value = params.oi)
    await sheet?.save()

    socket.emit('message', {
        type: ValidMessageType.Operation,
        params
    })
    socket.to(sheetId).emit('message', {
        type: ValidMessageType.Operation,
        params
    })
}