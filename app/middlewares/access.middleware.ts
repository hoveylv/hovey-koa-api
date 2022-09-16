import { Context, Next } from 'koa'
import { accessLogger } from './../logger/index'

function AccessLogMiddleWare(ctx: Context, next: Next) {
  const log = `path:${ctx.path} | method:${ctx.method} | user-agent:${ctx.headers['user-agent']}`
  accessLogger.info(log)
  return next()
}

export default AccessLogMiddleWare
