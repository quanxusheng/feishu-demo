import { faker } from '@faker-js/faker'
const { uuid } = faker.string

import { UserLoginParam } from '../userController/types'
import sheet from '../../db/sheet'

interface DefaultRows {
    id: string
    [key:string]: string
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
defaultColumns.map(column => {
    return {
        id: uuid()
    }
})

const defaultRows = (): DefaultRows[] => {
    return defaultColumns.map(column => {
        const data:DefaultRows = {
            id: uuid(),
        }
        data[column.id] = ''
        console.log('=>column.id', column.id)
        console.log('=>data', data)
        return data
        // return {
        //     id: uuid(),
        //     [column.id]: ''
        // }
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