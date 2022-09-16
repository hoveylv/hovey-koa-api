import type { Server } from 'http'
import dotenv from 'dotenv'

import Koa from 'koa'
import router from './router'
import AccessLogMiddleWare from './middlewares/access.middleware'
dotenv.config()

const app = new Koa()

app.use(AccessLogMiddleWare).use(router.routes())

const run = (port: any, callback: () => void): Server => {
  return app.listen(port, callback)
}

export { run }
