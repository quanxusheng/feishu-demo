import { useSelector, useDispatch } from 'react-redux'
import {useCallback, useMemo, Key} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {get, omit} from 'lodash-es'

import { RootState } from '../store'
import { createSheet, updataSheet, getOriginSheetsData } from '../store/slicers/sheetsSlice'
import { Sheet, Table } from '../store/types'
import { OperationEmiter } from '@/socket/messageEmiter'
import { updateRoomVersion } from '@/store/slicers/WorkInProgressRoomInfo'

import { OriginOperationParams} from '@/socket/types'




export default function useSheets() {
    const sheets = useSelector((state: RootState) => state.sheets)
    const workInProgressRoomInfo = useSelector((state:RootState) => state.workInProgressRoomInfo)
    const sheetsArr = useMemo<Array<Table>>(() => {
        return sheets && sheets.tableList
    }, [sheets])
    const dispatch = useDispatch()
    const to = useNavigate()
    const urlParams = useParams()
    console.log('=>urlParams', urlParams)
    

    const sheetUrlParams = useMemo<{sheetId: string, tableId: string}>(() => {
        return {
            sheetId: urlParams.sheetId,
            tableId: urlParams.tableId,
        }
    }, [urlParams.sheetId, urlParams.tableId])

    const getTargetSheetViewsArr = useCallback((tableId) => {
        return Object.values(sheets[tableId].views)
    }, [sheets])

    const getCurrentTable = useMemo(() => {
        const table = get(sheets, urlParams.tableId)
        console.log('=table>', table)
        return {
            table,
            rows: table.rows,
            columns: table.columns
        }
    }, [urlParams.tableId, sheets])

    // const currentTableRows = useMemo(() => {
    //     const { rows } = currentTable
    //     return {
    //         rows,
    //         rowsArr: Object.values(rows)
    //     }
    // }, [currentTable])

    const getTargetViewColumns = useMemo(() => {
        // const {columns, views} = currentTable
        // const columnsConfig = views[urlParams.viewId].columnsConfig
        // return {
        //     columns,
        //     columnsArr: Object.values(columns),
        //     columnsConfig,
        //     columnsConfigArr: Object.values(columnsConfig),
        //     ...urlParams
        // }
    }, [])

    const navigatorToTargetView = useCallback((tableId: Key) => {
        // console.log('=>tableId', tableId)
        // if (!tableId) {
        //     const firstView = getTargetSheetViewsArr(tableId)[0]
        //     tableId = firstView.id
        // }
        // to(`/base/${sheetId}/?table=${tabData.id}`)
    }, [])

    
    const createSheetDispatcher = useCallback((sheetName?: string) => {
        dispatch(createSheet({
            name: sheetName,
            sheetId: urlParams.sheetId,
            roomVersion: workInProgressRoomInfo.roomVersion + 1
        }))
        dispatch(updateRoomVersion(workInProgressRoomInfo.roomVersion + 1))
    },[dispatch, urlParams.sheetId, workInProgressRoomInfo.roomVersion])

    const setCellValue = useCallback((params:OriginOperationParams) => {
        OperationEmiter({
            ...params,
            payload: {
                // sheetId: urlParams.sheetId
            }
        })
    }, [])

    const updataSheetDispather = useCallback((payload) => {
        // console.log('=>payload', payload)
        dispatch(updataSheet({...omit(payload, 'destroyAtomComponent'), ...urlParams}))
    }, [dispatch, urlParams])



    const getOriginSheetsDataDispatcher = useCallback((data) => {
        dispatch(getOriginSheetsData(data))
    }, [dispatch])

    return {    
        sheets,
        
        getTargetViewColumns,
        createSheetDispatcher,
        updataSheetDispather,
        navigatorToTargetView,
        getTargetSheetViewsArr,
        setCellValue,

        getOriginSheetsDataDispatcher,
        getCurrentTable,
        sheetsArr,
        sheetUrlParams,
    }
}