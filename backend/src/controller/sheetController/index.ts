import { faker } from '@faker-js/faker'
const { uuid } = faker.string

import { UserLoginParam } from '../userController/types'
import sheet from '../../db/sheet'

export const createDefaultSheet = async (params: UserLoginParam) => {
    const initData = {
        id: uuid(),
        sheetName: faker.company.name(),
        tableList: [
            {
                id: uuid(),
                name: faker.commerce.department()
            }
        ],
        creator: params.username,
        createTime: Date.now()
    }
    return await sheet.create(initData)
}