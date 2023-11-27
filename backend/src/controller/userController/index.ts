import { UserLoginParam } from './types'
import userdb from '../../db/user'

import { createDefaultSheet, findOrCreateDefaultSheet } from '../sheetController'
// import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'


export const login = async function(params: UserLoginParam) {
    let result:any = await userdb.findOne({email: params.email})
    console.log('=>result111', result)

    // 未注册
    if (!result) {
        result = await register(params)
    } else {
        
    }
    console.log('=>result111', result)
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                {
                    msg: '登录成功',
                    code: 200,
                    data: result
                }
            )
        }, 1000)
    })
}

async function register(payload: UserLoginParam) {
    const params = { ...payload }

    const { uuid } = faker.string
    const { avatar } = faker.image
    params.id = uuid()
    params.avatar = avatar()
    // 注册用户
    let user = await userdb.create(params)
    let result = null
    // console.log('=>user', user)
    let sheetData = null
    if (user) {
        const {id: userId, username, email, avatar} = user
        // 创建一个默认sheet
        sheetData = await findOrCreateDefaultSheet(params)
        result = {
            userId,
            username,
            email,
            avatar,
            sheetData
        }
    }
    
    return result
}

const returnUserAndSheet = async (params: UserLoginParam) => {
    
}