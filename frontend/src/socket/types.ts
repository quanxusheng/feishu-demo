import { Key } from "react"


export enum ValidMessageType {
    JoinRoom = 'JoinRoom',
    Operation = 'Operation',
    Focus = 'Focus',
    LeaveRoom = 'LeaveRoom',
    VersionConfirm = 'VersionConfirm',
    OperationSheet = 'OperationSheet'
}

export type ValidOperationType = 'addSheet' | 'updataSheet'
export interface OriginOperationParams<PayloadType = any> {
    oi: string | number | null // operation insert 实际插入的值
    od: string | number | null // operation delete 实际删除的值
    path: Key[] // 操作的具体位置
    operation: ValidOperationType // 操作的类型
    payload?: PayloadType// 预留额外的参数
}

export interface OriginOperationPayload {
    roomId: string
    roomVersion: number
}

export interface AddSheetOriginPayload extends OriginOperationPayload {
    viewId: string
    columnId: string
    sheetName: string
}

export interface AddSheetOperationParams extends OriginOperationParams<AddSheetOriginPayload> {
    operation: 'addSheet'
}

export interface OriginRoomParams {
    roomId: string
    userId: string
}

export interface JoinRoomParams extends OriginRoomParams {
    username: string
    avatar: string
}

export interface OperationMessage<Payload = any> {
    type: ValidMessageType.Operation,
    params: OriginOperationParams<Payload>
}
export interface JoinRoomMessage {
    type: ValidMessageType.JoinRoom
    params: JoinRoomParams
}

export interface LeaveRoomMessage {
    type: ValidMessageType.LeaveRoom
    params: OriginRoomParams
}

export interface FocusMessage {
    type: ValidMessageType.Focus,
    params: {
        userId: string
        path: string[] // sheetId viewId rowId columnId
    }
}

export interface VersionConfirmMessage {
    type:ValidMessageType.VersionConfirm
    params: {
        roomVersion: number
    }
}

export interface AddSheetParams extends AddSheetOriginPayload {
    sheetId: string,
    sheetName: string,
}

export interface OperationSheetMessage {
    type: ValidMessageType.OperationSheet,
    params: AddSheetParams
}


export type ValidMessage = JoinRoomMessage | LeaveRoomMessage | FocusMessage | OperationMessage | VersionConfirmMessage | OperationSheetMessage