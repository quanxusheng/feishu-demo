import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid} from 'uuid'

import { Sheet } from '../types'
import {sheetTemplateCreator} from '../utils'

import { OperationSheet } from '@/socket/messageEmiter'


const initialState: {
    [columnId: string]: Sheet
} = {
    "7d690de4-e9e5-43de-8721-6845e20527d7": {
        "id": "7d690de4-e9e5-43de-8721-6845e20527d7",
        "name": "营销配置",
        "views": {
            "07827929-4e3f-4f35-b5d9-17cee01a5cdf": {
                "id": "07827929-4e3f-4f35-b5d9-17cee01a5cdf",
                "name": "表格视图",
                columnsConfig: {
                    "784a7165-8829-40e6-851e-4f63a494ee76": {
                        width: 200,
                        sort: 0
                    }
                }
            }
        },
        "rows": {
            "0e298ffb-1181-45c2-872a-dfa509373eb5": {
                "id": "0e298ffb-1181-45c2-872a-dfa509373eb5",
                "784a7165-8829-40e6-851e-4f63a494ee76": "helloworld"
            },
            "0e298ffb-1181-45c2-872a-6": {
                "id": "0e298ffb-1181-45c2-872a-6",
                "784a7165-8829-40e6-851e-4f63a494ee76": "okok"
            },
            "0e298ffb-1181-45c2-872a-7": {
                "id": "0e298ffb-1181-45c2-872a-7",
                "784a7165-8829-40e6-851e-4f63a494ee76": "ooop"
            },
        },
        "columns": {
            "784a7165-8829-40e6-851e-4f63a494ee76": {
                "id": "784a7165-8829-40e6-851e-4f63a494ee76",
                "columnType": "TEXT",
                "columnProps": {},
                "name": "多行文本",
            },
        },
  }
}
const sheetsSlice = createSlice({
    name: 'sheets',
    initialState,
    reducers: {
        createSheet: (state, action) => {
            const sheet = sheetTemplateCreator(action.payload.name || '数据表')
            console.log('=>createSheet', sheet)
            const { id, name, views, columns} = sheet
            state[sheet.id] = sheet

            const viewId = Object.values(views)[0].id
            const columnId = Object.values(columns)[0].id
            // console.log('=>action.payload', action.payload)
                OperationSheet({
                    ...action.payload,
                    sheetId: id,
                    sheetName: name,
                    viewId,
                    columnId

                    // roomId: sheetUrlParams.
                })

        },
        updataSheet: (state, action) => {
            // console.log('=>updataSheet', action)
            const {sheetId, viewId, rowId, colId, value} = action.payload
            state[sheetId].rows[rowId][colId] = value
            
        }
    }
})
export const {updataSheet, createSheet} = sheetsSlice.actions
export default sheetsSlice.reducer