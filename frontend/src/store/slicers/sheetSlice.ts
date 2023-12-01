import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid} from 'uuid'

import { Sheet } from '../types'
// import {sheetTemplateCreator} from '../utils'

import { OperationSheet } from '@/socket/messageEmiter'

import {pushToRetentionOperations} from '@/socket/socketQueue'


// const initialState: Sheet|null = null
const initialState: Sheet = {
    id: '',
    name: '',
    tableList: []
}

const sheetSlice = createSlice({
    name: 'sheet',
    initialState,
    reducers: {
        getOriginSheetsData(state, {payload}) {
            // console.log(`%c =>getOriginSheetsData-state=> ${state}`, 'color: green')
            console.log('=>getOriginSheetsData-state', state)
            console.log('=>0000', payload)
            // Object.assign({}, state, payload)
            state = {...payload}
        },
        createSheet: (state, action) => {
            // const sheet = sheetTemplateCreator(action.payload.name || '数据表')
            // console.log('=>createSheet', sheet)
            // const { id, name, views, columns} = sheet
            // state[sheet.id] = sheet

            // const viewId = Object.values(views)[0].id
            // const columnId = Object.values(columns)[0].id
            // console.log('=>action.payload', action.payload)

            // pushToRetentionOperations({
            //     roomVersion: action.payload.roomVersion + 1,
            //     executor: () => OperationSheet({
            //         ...action.payload,
            //         id,
            //         name,
            //         viewId,
            //         columnId,
            //         roomVersion: action.payload.roomVersion + 1,
            //     })
            // })
        },
        applyOriginAddSheet(state, action) {
            console.log('=>state5555555555555', state)
            console.log('=>action5555555555', action)
            state[action.payload.id] = action.payload
        },
        updataTable(state, action) {
            console.log('=>updataTable-state', state)
            console.log('=>updataTable-state.tableList', state.tableList)
            console.log('=>updataTable-action', action)
            // state.tableList = action.payload.tableList
            const {path, oi, tableId} = action.payload
            const table = state.tableList.find(f => f.id === tableId)
            console.log('=>table', table)
            const row = table.rows.find(r => r.id === path[0])
            console.log('=>row', row)
            const col = row.columns.find(c => c.id === path[1])
            console.log('=>col', col)
            col.value = oi
            console.log('=>Changed-updataTable', state)
            // state[tableId]
            // state[tableId].rows[path[0]][path[1]] = oi
            
        }
    }
})
export const { getOriginSheetsData, updataTable, createSheet, applyOriginAddSheet } = sheetSlice.actions
export default sheetSlice.reducer
