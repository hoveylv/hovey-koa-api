import { Context, Next } from 'koa'
import { verify } from '../utils/auth'

function AuthMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers.authorization

  if (token !== undefined && token !== '') {
    const { error } = verify(token)
    if (error !== null) {
      ctx.body = {
        msg: error.message,
        code: 4000,
      }
      return
    } else {
      return next()
    }
  }
  ctx.body = {
    msg: 'authorization error',
    code: 4000,
  }
}

export default AuthMiddleware
