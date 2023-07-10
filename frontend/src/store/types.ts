

// 允许创建的column类型

export type ColumnMap = {
    TEXT: {},
    SELECT: {
        options: Array<{label: string; value: string; id: string}>
    }
}

// x + y 锁定一个value
export interface Row {
    id: string
    [columnId: string]: string
}

export interface Column<ColumnType extends keyof ColumnMap> {
    id: string,
    name: string,
    columnType: ColumnType
    columnProps: ColumnMap[ColumnType]
}

export interface ColumnConfig {
    width: number
    sort: number
}

export interface View {
    id: string
    name: string
    columnsConfig: {
        [columnId: string]: ColumnConfig
    }
}

// 表的类型

export interface Sheet {
    id: string
    name: string
    columns: {
        [columnId: string]: Column<any>
    }
    views: {
        [viewId: string]: View
    },
    rows: {
        [rowId: string]: Row
    }
}