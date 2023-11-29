

// 允许创建的column类型

export type ColumnMap = {
    text: {},
    selectSingle: {
        options: Array<{label: string; value: string; id?: string}>
    }
}

// x + y 锁定一个value
export interface Row {
    id: string
    [columnId: string]: string
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

export interface Column<ColumnType extends keyof ColumnMap> {
    id: string,
    name: string,
    type: string,
    config?: object
    // columnType: ColumnType
    // columnProps: ColumnMap[ColumnType]
}

// 表的类型

export interface Table {
    id: string
    name: string
    columns: {
        [columnId: string]: Column<any>
    }
    rows: {
        [rowId: string]: Row
    }
}

export interface Sheet {
    id: string
    name: string
    tableList: Table[]

    // columns: {
    //     [columnId: string]: Column<any>
    // }
    // views: {
    //     [viewId: string]: View
    // },
    // rows: {
    //     [rowId: string]: Row
    // }
}