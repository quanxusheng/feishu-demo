import {UserLoginParam} from './types'
import userdb from '../../db/user'

export const login = async function(params: UserLoginParam) {
    let returnResult = null
    const userlist = await userdb.find()
    console.log('=>userlist', userlist)
    const exist = userlist.find(f => f.email === params.email)
    console.log('=>exist', exist)
    if (!exist) {
        await userdb.create(params)
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