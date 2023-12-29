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
    tableList: [],
    creatorId: '',
    creator: '',
    createTime: '',
}
const sheetSlice = createSlice({
    name: 'sheet',
    initialState,
    reducers: {
        getOriginSheetsData(state, {payload}) {
            // console.log('=>0000', payload)
            return payload
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
            state[action.payload.id] = action.payload
        },
        updataTable(state, action) {
            console.log('=>updataTable-action', action)
            const {path, oi, tableId} = action.payload
            const table = state.tableList.find(f => f.id === tableId)
            const row = table && table.rows.find(r => r.id === path[0])
            const col = row && row.columns.find(c => c.id === path[1])
            if (col) {
                col.value = oi
            }
        }
    }
})
export const { getOriginSheetsData, updataTable, createSheet, applyOriginAddSheet } = sheetSlice.actions
export default sheetSlice.reducer
