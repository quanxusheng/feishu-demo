import { useSelector, useDispatch } from 'react-redux'
import {useCallback, useMemo, useEffect} from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import {get, omit} from 'lodash-es'

import { RootState } from '../store'
import {  updataTable, getOriginSheetsData } from '../store/slicers/sheetSlice'
import { Sheet, Table } from '../store/types'
import { OperationEmiter } from '@/socket/messageEmiter'
import { updateRoomVersion } from '@/store/slicers/WorkInProgressRoomInfo'

import { OriginOperationParams} from '@/socket/types'

import useUrlParams from './useUrlParams'

import useUserWorker from './useUserWorker'

import { OperationSheet } from '@/socket/messageEmiter'

import {pushToRetentionOperations} from '@/socket/socketQueue'




export default function useSheets() {
    const dispatch = useDispatch()
    const to = useNavigate()
    const { sheetUrlParams } = useUrlParams()
    const { user } = useUserWorker()
    // const urlParams = useParams()
    // const location = useLocation()
    // const locationSearch = queryString.parse(location.search)

    // let sheet = useSelector((state: RootState) => state.sheet)
    let sheetState = useSelector((state: RootState) => state.sheet)
    // console.log('=>useSheets-table更新了', sheetState)

    const sheet = useMemo(() => {
        if (!sheetState || !sheetState.id) {
            const data = JSON.parse(localStorage.getItem('sheetData') || null)
            // console.log('=>2222222222', data)
            dispatch(getOriginSheetsData(data))
            return data
        }
        return sheetState
    }, [dispatch, sheetState])

    const workInProgressRoomInfo = useSelector((state:RootState) => state.workInProgressRoomInfo)
    
    const sheetArr = useMemo<Array<Table>>(() => {
        return sheet && sheet.tableList
    }, [sheet])

    const getCurrentTable = useMemo(() => {
        // if (!sheetUrlParams.tableId) return
        const table = sheet.tableList.find(item => item.id === sheetUrlParams.tableId)
        return {
            table,
            rows: table.rows,
            columns: table.columns
        }
    }, [sheetUrlParams.tableId, sheet])

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

    const navigatorToTargetView = useCallback((id) => {
        // const { sheetId, tableId } = sheetUrlParams
        // const {id , tableList} = sheet
        // let tempTableId;
        // if (sheetId) {
        //     if (sheetId === id) {
        //         if (tableId) {
        //            tempTableId = tableId
        //         } else {
        //             tempTableId = tableList[0].id
        //         }
        //     } else {
        //         localStorage.clear()
        //         to('/login')
        //     }
        // }
        //  to(`/base/${sheetId}?tableId=${tempTableId}`)
    },[])

    
    const createTableDispatcher = useCallback((name?: string) => {
        // dispatch(createTable({
        //     name,
        //     sheetId: sheetUrlParams.sheetId,
        //     roomVersion: workInProgressRoomInfo.roomVersion + 1,
        //     userId: user.userId
        // }))
            pushToRetentionOperations({
                roomVersion: workInProgressRoomInfo.roomVersion + 1,
                executor: () => OperationSheet({
                    name,
                    id: sheetUrlParams.sheetId,
                    roomVersion: workInProgressRoomInfo.roomVersion + 1,
                    userId: user.userId
                })
            })
        dispatch(updateRoomVersion(workInProgressRoomInfo.roomVersion + 1))
    },[dispatch, sheetUrlParams.sheetId, user.userId, workInProgressRoomInfo.roomVersion])



    const setCellValue = useCallback((params:OriginOperationParams) => {
        OperationEmiter({
            ...params,
            payload: {
                sheetId: sheetUrlParams.sheetId
            }
        })
    }, [sheetUrlParams.sheetId])



    return {    
        sheet,
        
        getTargetViewColumns,
        createTableDispatcher,
        // updataTableDispather,
        // navigatorToTargetView,
        setCellValue,

        // getOriginSheetsDataDispatcher,
        getCurrentTable,
        sheetArr,
        // sheetUrlParams,

        navigatorToTargetView,
    }
}