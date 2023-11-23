import { UserLoginParam } from './types'
import userdb from '../../db/user'

// import { v4 as uuid } from 'uuid'
import {faker} from '@faker-js/faker'

async function register(params: UserLoginParam) {
    const { uuid } = faker.string
    const { avatar } = faker.image
    params.userId = uuid()
    params.avatar = avatar()
    await userdb.create(params)
}

export const login = async function(params: UserLoginParam) {
    let returnResult = null
    const userlist = await userdb.find()
    const exist = userlist.find(f => f.email === params.email)
    console.log('=>exist', exist)

    // 未注册
    if (!exist) {
        await register(params)
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            if (exist) {
                returnResult = {
                    msg: '用户已注册',
                    code: 200,
                    data: params
                }
            } else {
                returnResult = {
                    msg: '用户注册成功',
                    code: 200,
                    data: params
                }
            }
            resolve(returnResult)
        }, 2000)
    })
}