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
        name: '文本',
        type: 'text',
        width: 200
    },
    {
        id: uuid(),
        name: '单选',
        type: 'selectSingle',
        width: 200,
        config: {
            options: [
                {
                    label: '男',
                    value: '1'
                },
                {
                    label: '女',
                    value: '0'
                },
            ]
        }
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
        creatorId: params.id,
        creator: params.username,
        createTime: Date.now()
    }
    return await sheet.create(initData)
}

export const findOrCreateDefaultSheet = async (params: UserLoginParam) => {
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
        creatorId: params.id,
        creator: params.username,
        createTime: Date.now()
    }
    return await sheet.findOneAndUpdate(
        {
            creatorId: params.id
        },
        { $setOnInsert: initData },
        {new: true, upsert: true}
    )
}