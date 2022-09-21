/* eslint import/first: "off" */

import type { Server } from 'http'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import koaBody from 'koa-body'
import KoaStatic from 'koa-static'

import db from './db'
db()
import router from './router'
import AccessLogMiddleWare from './middlewares/access.middleware'

const app = new Koa()

app
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    })
  )
  .use(
    KoaStatic(path.join(__dirname, '..', 'public'), {
      index: false,
      hidden: false,
    })
  )
  .use(AccessLogMiddleWare)
  .use(router.routes())

const run = (port: any, callback: () => void): Server => {
  return app.listen(port, callback)
}

export { run }
