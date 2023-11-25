import { useSelector, useDispatch } from 'react-redux'
import {useCallback, useMemo, Key} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {get, omit} from 'lodash-es'

import { RootState } from '../store'
import { createSheet, updataSheet, getOriginSheetsData } from '../store/slicers/sheetsSlice'
import { Sheet } from '../store/types'
import { OperationEmiter } from '@/socket/messageEmiter'
import { updateRoomVersion } from '@/store/slicers/WorkInProgressRoomInfo'

import { OriginOperationParams} from '@/socket/types'




export default function useSheets() {
    const sheets = useSelector((state: RootState) => state.sheets)
    const workInProgressRoomInfo = useSelector((state:RootState) => state.workInProgressRoomInfo)
    const sheetsArr = useMemo<Array<Sheet>>(() => Object.values(sheets), [sheets])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    // console.log('=>params', params)
    const currentTargetSheet = useMemo(() => get(sheets, params.sheetId), [params.sheetId, sheets])

    const sheetUrlParams = useMemo<{roomId: string, sheetId: string, viewId: string}>(() => {
        return {
            roomId: params.roomId,
            sheetId: params.sheetId,
            viewId: params.viewId,
        }
    }, [params.roomId, params.sheetId, params.viewId])

    const getTargetSheetViewsArr = useCallback((sheetId) => {
        return Object.values(sheets[sheetId].views)
    }, [sheets])

    const getTargetViewRows = useMemo(() => {
        const { rows } = currentTargetSheet
        return {
            rows: rows,
            rowsArr: Object.values(rows)
        }
    }, [currentTargetSheet])

    const getTargetViewColumns = useMemo(() => {
        const {columns, views} = currentTargetSheet
        const columnsConfig = views[params.viewId].columnsConfig
        return {
            columns,
            columnsArr: Object.values(columns),
            columnsConfig,
            columnsConfigArr: Object.values(columnsConfig),
            ...params
        }
    }, [currentTargetSheet, params])

    const navigatorToTargetView = useCallback((sheetId: Key, viewId?: Key) => {
        console.log('=>sheetId', sheetId)
        if (!viewId) {
            const firstView = getTargetSheetViewsArr(sheetId)[0]
            viewId = firstView.id
        }
        navigate(`/base/${sheetId}/${viewId}`)
    }, [getTargetSheetViewsArr, navigate])

    
    const createSheetDispatcher = useCallback((sheetName?: string) => {
        dispatch(createSheet({
            name: sheetName,
            roomId: sheetUrlParams.roomId,
            roomVersion: workInProgressRoomInfo.roomVersion + 1
        }))
        dispatch(updateRoomVersion(workInProgressRoomInfo.roomVersion + 1))
    },[dispatch, sheetUrlParams.roomId, workInProgressRoomInfo.roomVersion])

    const setCellValue = useCallback((params:OriginOperationParams) => {
        OperationEmiter({
            ...params,
            payload: {
                roomId: sheetUrlParams.roomId
            }
        })
    }, [sheetUrlParams.roomId])

    const updataSheetDispather = useCallback((payload) => {
        // console.log('=>payload', payload)
        dispatch(updataSheet({...omit(payload, 'destroyAtomComponent'), ...sheetUrlParams}))
    }, [dispatch, sheetUrlParams])



    const getOriginSheetsDataDispatcher = useCallback((data) => {
        dispatch(getOriginSheetsData(data))
    }, [dispatch])

    return {    
        sheets,
        sheetsArr,
        sheetUrlParams,
        getTargetViewRows,
        getTargetViewColumns,
        createSheetDispatcher,
        updataSheetDispather,
        navigatorToTargetView,
        getTargetSheetViewsArr,
        setCellValue,
        getOriginSheetsDataDispatcher
    }
}