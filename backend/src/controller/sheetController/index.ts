import { faker } from '@faker-js/faker'
const { uuid } = faker.string

import { UserLoginParam } from '../userController/types'
import sheet from '../../db/sheet'

interface DefaultRows {
    id: string
    columns: [
        {
            id: string
            value: string
        }
    ]
}
const defaultColumns = [
    {
        id: uuid(),
        type: 'text',
    },
    {
        id: uuid(),
        type: 'select',
    },
]

const defaultRows = (): DefaultRows[] => {
    return defaultColumns.map(column => {
        const data:DefaultRows = {
            id: uuid(),
            columns: [
                {
                    id: column.id,
                    value: ''
                }
            ]
        }
        return data
    })
}


export const createDefaultSheet = async (params: UserLoginParam) => {
    const initData = {
        id: uuid(),
        sheetName: faker.company.name(),
        tableList: [
            {
                id: uuid(),
                name: faker.commerce.department(),
                rows: defaultRows(),
                columns: defaultColumns
            }
        ],
        creator: params.username,
        createTime: Date.now()
    }
    return await sheet.create(initData)
}