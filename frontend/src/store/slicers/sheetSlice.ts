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
        updataSheet: (state, action) => {
            console.log('=>updataSheet', action)
            const {path, oi, tableId} = action.payload
            // state[tableId].rows[path[0]][path[1]] = oi
            
        }
    }
})
export const { getOriginSheetsData, updataSheet, createSheet, applyOriginAddSheet } = sheetSlice.actions
export default sheetSlice.reducer