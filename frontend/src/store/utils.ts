// 生成模块

import {v4 as uuid} from 'uuid'


import {ColumnConfig, View, Column, Sheet} from './types'

export const viewTemplateCreator: (name: string, columnsIdArr: string[], viewId?: string) => View = (name, columnsIdArr, viewId) => {

    const columnsConfig: {
        [columnId: string]: ColumnConfig
    } = {}

    columnsIdArr.forEach(columnId => {
        columnsConfig[columnId] = {
            width: 200,
            sort: 0
        }
    })

    return {
        id: viewId || uuid(),
        name,
        columnsConfig
    }
}

export const columnInitTemplateCreator: (name: string, columnId?: string) => Column<'TEXT'> = (name, columnId) => {
    return {
        id: columnId || uuid(),
        name: '多行文本',
        columnType: 'TEXT',
        columnProps: {}
    }
}

export const sheetTemplateCreator: (name: string, message?: object) => Sheet = (name, message) => {

    const sheetId = uuid()
    const defaultTextColumn = columnInitTemplateCreator('多行文本', uuid())
    const defaultView = viewTemplateCreator('表格视图', [defaultTextColumn.id])

    return {
        id: sheetId,
        name,
        columns: {
            [defaultTextColumn.id]: defaultTextColumn,
        },
        views: {
            [defaultView.id]: defaultView
        },
        rows: {}
    }

}