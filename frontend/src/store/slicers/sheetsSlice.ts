import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid} from 'uuid'

import { Sheet } from '../types'
import {sheetTemplateCreator} from '../utils'

const initialState: {
    [columnId: string]: Sheet
} = {
    "1cf850b5-e652-4426-a3e6-9162fc249af6": {
        "id": "1cf850b5-e652-4426-a3e6-9162fc249af6",
        "name": "营销配置",
        "columns": {
            "f7dfa59c-85eb-4d4f-8841-53603e1879cf": {
                "id": "f7dfa59c-85eb-4d4f-8841-53603e1879cf",
                "columnType": "TEXT",
                "columnProps": {},
                "name": "多行文本",
            }
        },
        "views": {
            "25f212ae-bd4d-4e05-ae97-c01e53e9d66f": {
                "id": "25f212ae-bd4d-4e05-ae97-c01e53e9d66f",
                "name": "表格视图",
                columnsConfig: {
                    "f7dfa59c-85eb-4d4f-8841-53603e1879cf": {
                        width: 200,
                        sort: 0
                    }
                }
            }
        },
        "rows": {
            "25fae-bd4d-4e05-se237-c01e53e9d66f": {
                "id": "25fae-bd4d-4e05-se237-c01e53e9d66f",
                "f7dfa59c-85eb-4d4f-8841-53603e1879cf": "helloworld"
            }
        }
  }
}
const sheetsSlice = createSlice({
    name: 'sheets',
    initialState,
    reducers: {
        createSheet: (state, action) => {
            const sheet = sheetTemplateCreator(action.payload.name || '数据表')
            state[sheet.id] = sheet
            // console.log('=>ccccc', sheet)

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