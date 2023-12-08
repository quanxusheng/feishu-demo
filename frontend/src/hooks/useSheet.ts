import { useSelector, useDispatch } from 'react-redux'
import {useCallback, useMemo, useEffect} from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import {get, omit} from 'lodash-es'

import { RootState } from '../store'
import { createSheet, updataTable, getOriginSheetsData } from '../store/slicers/sheetSlice'
import { Sheet, Table } from '../store/types'
import { OperationEmiter } from '@/socket/messageEmiter'
import { updateRoomVersion } from '@/store/slicers/WorkInProgressRoomInfo'

import { OriginOperationParams} from '@/socket/types'

import useUrlParams from './useUrlParams'




export default function useSheets() {
    const dispatch = useDispatch()
    const to = useNavigate()
    const {sheetUrlParams} = useUrlParams()
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

    console.log('=9999>', sheet)

    // useEffect(() => {
    // console.log('=8888>', sheet)
    // if (!sheet) {
    //     sheet = JSON.parse(localStorage.getItem('sheetData'))
    //     dispatch(getOriginSheetsData(sheet))
    // }
    // console.log('=9999>', sheet)
    // }, [dispatch])
    // let sheet = useSelector((state: RootState) => state.sheet)
    // console.log('=8888>', sheet)
    // if (!sheet) {
    //     sheet = JSON.parse(localStorage.getItem('sheetData'))
    //     dispatch(getOriginSheetsData(sheet))
    // }
    // console.log('=9999>', sheet)
        // useSelector((state: RootState) => state.sheet) ||
        // JSON.parse(localStorage.getItem('sheetData'))
    // console.log('=>sheetsheet', sheet)
    const workInProgressRoomInfo = useSelector((state:RootState) => state.workInProgressRoomInfo)
    const sheetArr = useMemo<Array<Table>>(() => {
        return sheet && sheet.tableList
    }, [sheet])
    // console.log('=>urlParams', urlParams)
    // console.log('=>location', location)
    // console.log('=>location', locationSearch)

    // const sheetUrlParams = useMemo<{sheetId: string, tableId: string}>(() => {
    //     return {
    //         sheetId: urlParams.sheetId,
    //         tableId: locationSearch.tableId as string,
    //     }
    // }, [urlParams.sheetId, locationSearch.tableId])
    // console.log('=>sheetUrlParams', sheetUrlParams)

    const getCurrentTable = useMemo(() => {
        const table = sheet.tableList.find(item => item.id === sheetUrlParams.tableId)
        // console.log('=table>', table)
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

    const navigatorToTargetView = useCallback((tableId: string) => {
        // console.log('=>tableId', tableId)
        // if (!tableId) {
        //     const firstView = getTargetSheetViewsArr(tableId)[0]
        //     tableId = firstView.idChatGPT
        
        
        // }
        // to(`/base/${sheetId}/?table=${tabData.id}`)
    }, [])

    
    const createSheetDispatcher = useCallback((name?: string) => {
        dispatch(createSheet({
            name,
            sheetId: sheetUrlParams.sheetId,
            roomVersion: workInProgressRoomInfo.roomVersion + 1
        }))
        dispatch(updateRoomVersion(workInProgressRoomInfo.roomVersion + 1))
    },[dispatch, sheetUrlParams.sheetId, workInProgressRoomInfo.roomVersion])


    // const getOriginSheetsDataDispatcher = useCallback((data) => {
    //     dispatch(getOriginSheetsData(data))
    // }, [dispatch])

    // const updataTableDispather = useCallback((payload) => {
    //     // console.log('=>updataTableDispather-sheet', sheet)
    //     // console.log('=>updataTableDispather-payload', payload)
    //     const data = {...payload, ...sheetUrlParams }
    //     console.log('=>updataTableDispather-uuuuu', data)
    //     dispatch(updataTable(data))
    // }, [dispatch, sheetUrlParams])

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
        createSheetDispatcher,
        // updataTableDispather,
        navigatorToTargetView,
        setCellValue,

        // getOriginSheetsDataDispatcher,
        getCurrentTable,
        sheetArr,
        // sheetUrlParams,
    }
}