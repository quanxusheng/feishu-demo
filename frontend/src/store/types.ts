

// 允许创建的column类型

export type ColumnMap = {
    text: any,
    selectSingle: {
        options: Array<{label: string; value: string; id?: string}>
    }
}

// x + y 锁定一个value
export interface Row {
    id: string
    columns: [
        {
            id: string
            value: string
        }
    ]
}



// export interface ColumnConfig {
//     width: number
//     sort: number
// }

// export interface View {
//     id: string
//     name: string
//     columnsConfig: {
//         [columnId: string]: ColumnConfig
//     }
// }

// export interface Column<ColumnType extends keyof ColumnMap> {
export interface Column{
    id: string,
    title: string,
    type: string,
    width: number
    height: number
    config?: any
}

// 表的类型

export interface Table {
    id: string
    name: string
    columns: Column[]
    rows: Row[]
}
export interface Sheet {
    id: string
    name: string
    creatorId: string
    creator: string
    createTime: string
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