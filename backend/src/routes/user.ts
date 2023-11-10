import KoaRouter from '@koa/router'
import {login} from '../controller/userController/index'
import {UserLoginParam} from '../controller/userController/types'

const userRouter = new KoaRouter()

userRouter.post('/login', async (ctx) => {

    // console.log('=>用户发送了登录请求', ctx.request)
    // console.log('=>用户发送了登录请求', ctx.request.body)

    const result = await login(ctx.request.body as UserLoginParam)
    ctx.body = result
    // if (user) {
    //     ctx.body = {
    //         status: 200,
    //         message: 'ok',
    //         data: user
    //     }
    // } else {
    //     ctx.body = {
    //         status: 4009,
    //         message: 'password in not correct',
    //         data: null
    //     }
    // }
})

export default userRouter.routes()