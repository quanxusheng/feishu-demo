import Koa from 'koa'

import userRouter from './user'
import { Middleware } from '@koa/router'

export default function (ctx: { use: (arg0: Middleware<Koa.DefaultState, Koa.DefaultContext, unknown>) => void }) {
    ctx.use(userRouter)
}