/* eslint import/first: "off" */

import type { Server } from 'http'
import dotenv from 'dotenv'
dotenv.config()
import Koa from 'koa'
import db from './db'
db()
import router from './router'
import AccessLogMiddleWare from './middlewares/access.middleware'

const app = new Koa()

app.use(AccessLogMiddleWare).use(router.routes())

const run = (port: any, callback: () => void): Server => {
  return app.listen(port, callback)
}

export { run }
