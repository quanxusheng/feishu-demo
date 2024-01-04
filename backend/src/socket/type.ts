

export enum ValidMessageType {
    JoinRoom = 'JoinRoom',
    Operation = 'Operation',
    Focus = 'Focus',
    LeaveRoom = 'LeaveRoom',
    VersionConfirm = 'VersionConfirm',
    OperationSheet = 'OperationSheet'
}

export type ValidOperationType = 'addSheet' | 'updataSheet' | 'updataTable'
export interface OriginOperationParams<PayloadType = any> {
    oi: string | number | null // operation insert 实际插入的值
    od: string | number | null // operation delete 实际删除的值
    path: string[] // 操作的具体位置
    operation: ValidOperationType // 操作的类型
    payload?: PayloadType// 预留额外的参数
}

export interface OriginOperationPayload {
    sheetId: string
    roomVersion: number
}

export interface AddSheetOriginPayload extends OriginOperationPayload {
    viewId: string
    columnId: string
    name: string
}

export interface AddSheetOperationParams extends OriginOperationParams<AddSheetOriginPayload> {
    operation: 'addSheet'
}

export interface OriginRoomParams {
    sheetId: string
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
        path: string[] // tableId viewId rowId columnId
    }
}

export interface VersionConfirmMessage {
    type:ValidMessageType.VersionConfirm
    params: {
        roomVersion: number
    }
}

export interface AddTableParams extends OriginOperationPayload {
    sheetId: string,
    name: string,
    userId: string,
    roomVersion: number
}

export interface OperationSheetMessage {
    type: ValidMessageType.OperationSheet,
    params: AddTableParams
}


export type ValidMessage = JoinRoomMessage | LeaveRoomMessage | FocusMessage | OperationMessage | VersionConfirmMessage | OperationSheetMessage