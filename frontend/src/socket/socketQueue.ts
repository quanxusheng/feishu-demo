interface RetentionOperationDescriptor {
    roomVersion: number
    executor: VoidFunction
}

const retentionOperations:RetentionOperationDescriptor[] = []

let lock = false
let workInProgressRoomVersion: number | null = null

export const checkRoomVersion = (_roomVersion) => {
    console.log('=>_roomVersion', _roomVersion)
    console.log('=>workInProgressRoomVersion', workInProgressRoomVersion)
    if (_roomVersion === workInProgressRoomVersion) {
        lock = false
        workInProgressRoomVersion = null
    }
}

export const pushToRetentionOperations = (operationObj: RetentionOperationDescriptor) => {
    console.log('=>operationObj', operationObj)
    retentionOperations.push(operationObj)
}


const excuteRetentionOperation = ({executor, roomVersion}) => {
    lock = true
    workInProgressRoomVersion = roomVersion
    executor()
    requestAnimationFrame(circleCheckRetentionOperations)
}

const getLatestRetenttionOpertaion = () => {
    if (retentionOperations.length === 0) {
        return
    }
    const latestOperation = retentionOperations.shift()
    console.log('=>latestOperation', latestOperation)
    return latestOperation
}

const circleCheckRetentionOperations = () => {
    const latestOperationObj = getLatestRetenttionOpertaion()
    if (!latestOperationObj || lock) {
        requestAnimationFrame(circleCheckRetentionOperations)
    } else {
        console.log('=>////', '执行下一个')
        excuteRetentionOperation(latestOperationObj)
    }
}

export const enableSocketQueue = () => {
    console.log('=>///', '队列开启')
    circleCheckRetentionOperations()
}

