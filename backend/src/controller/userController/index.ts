import { UserLoginParam } from './types'
import userdb from '../../db/user'

import { findOrCreateDefaultSheet } from '../sheetController'
// import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'


export const login = async function(params: UserLoginParam) {
    let userInfo: any = await userdb.findOne({email: params.email}).select('-_id -__v')
    // console.log('=>result111', userInfo)

    /**
    `登录 - 是否注册 - 未注册 - 注册用户 - 创建默认sheet然后把用户信息和默认sheet一起返回`
    `登录 - 是否注册 - 已注册 - 查询用户 - 然后把用户信息和sheet列表一起返回`
    */
    let result: any = null
    // 未注册
    if (!userInfo) {
        result = await register(params)
    } else {
        // 已注册
        result = await loginSuccess(userInfo.toObject())
        console.log('=>result-pppp', result)
    }
    
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
    const { avatar: createAvatar } = faker.image
    params.id = uuid()
    params.avatar = createAvatar()

    // 注册用户
    let user = await userdb.create(params)
    // console.log('=>user', user)
    const { id: userId, username, email, avatar } = user

    // 创建一个默认sheet
    let sheetData = await findOrCreateDefaultSheet(params)
    
    let result = {
        userId,
        username,
        email,
        avatar,
        sheetData
    }
    return result
}

async function loginSuccess (params: UserLoginParam) {
    let sheetData = await findOrCreateDefaultSheet(params)
    return {
        ...params,
        userId: params.id,
        sheetData: sheetData.toObject()
    }
}



const returnUserAndSheet = async (params: UserLoginParam) => {
    
}