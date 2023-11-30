import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid} from 'uuid'

import { Sheet } from '../types'
// import {sheetTemplateCreator} from '../utils'

import { OperationSheet } from '@/socket/messageEmiter'

import {pushToRetentionOperations} from '@/socket/socketQueue'


const initialState: Sheet|null = null
// const initialState: Sheet = {
//     id: '',
//     name: '',
//     tableList: null
// }

const sheetSlice = createSlice({
    name: 'sheet',
    initialState,
    reducers: {
        getOriginSheetsData(state, { payload }) {
            Object.assign({}, state, payload)
            localStorage.setItem('sheetData', JSON.stringify(payload))
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
            // console.log('=>state', state)
            // console.log('=>action', action)
            state[action.payload.id] = action.payload
        },
        updataTable(state, action) {
            console.log('=>updataTable-state', state)
            console.log('=>updataTable-action', action)
            const {path, oi, tableId} = action.payload
            const table = state.tableList.find(f => f.id === tableId)[0]
            const row = table.rows.find(r => r.id === path[0])[0]
            const col = row.find(c => c.id === path[1])[0]
            col.value = oi
            // state[tableId]
            // state[tableId].rows[path[0]][path[1]] = oi
            
        }
    }
})
export const { getOriginSheetsData, updataTable, createSheet, applyOriginAddSheet } = sheetSlice.actions
export default sheetSlice.reducer