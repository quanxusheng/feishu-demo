import {UserLoginParam} from './types'

export const login = async function(userLoginInfo: UserLoginParam) {

    return new Promise((resolve) => {
        setTimeout(() => {
            const user = null
            resolve(user)
        }, 2000)
    })
}