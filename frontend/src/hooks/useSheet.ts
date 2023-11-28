import { useSelector, useDispatch } from 'react-redux'
import {useCallback, useMemo, Key} from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import {get, omit} from 'lodash-es'

import { RootState } from '../store'
import { createSheet, updataSheet, getOriginSheetsData } from '../store/slicers/sheetSlice'
import { Sheet, Table } from '../store/types'
import { OperationEmiter } from '@/socket/messageEmiter'
import { updateRoomVersion } from '@/store/slicers/WorkInProgressRoomInfo'

import { OriginOperationParams} from '@/socket/types'




export default function useSheets() {
    const sheet = 
        useSelector((state: RootState) => state.sheet) ||
        JSON.parse(localStorage.getItem('sheetData'))
    console.log('=>sheetsheet', sheet)
    const workInProgressRoomInfo = useSelector((state:RootState) => state.workInProgressRoomInfo)
    const sheetArr = useMemo<Array<Table>>(() => {
        return sheet && sheet.tableList
    }, [sheet])
    const dispatch = useDispatch()
    const to = useNavigate()
    const urlParams = useParams()
    const location = useLocation()
    const locationSearch = queryString.parse(location.search)
    // console.log('=>urlParams', urlParams)
    // console.log('=>location', location)
    console.log('=>location', locationSearch)

    const sheetUrlParams = useMemo<{sheetId: string, tableId: string}>(() => {
        return {
            sheetId: urlParams.sheetId,
            tableId: locationSearch.tableId as string,
        }
    }, [urlParams.sheetId, locationSearch.tableId])
    console.log('=>sheetUrlParams', sheetUrlParams)

    const getCurrentTable = useMemo(() => {
        const table = sheet.tableList.find(item => item.id === sheetUrlParams.tableId)
        console.log('=table>', table)
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




    return {    
        sheet,
        
        getTargetViewColumns,
        createSheetDispatcher,
        updataSheetDispather,
        navigatorToTargetView,
        setCellValue,

        // getOriginSheetsDataDispatcher,
        getCurrentTable,
        sheetArr,
        sheetUrlParams,
    }
}