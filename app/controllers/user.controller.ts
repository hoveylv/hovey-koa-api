import { Context } from 'koa'
import logger from '../logger'

class UserController {
  async find(ctx: Context) {
    logger.error('msg', 'request error:api not found.')
    ctx.body = { name: 'lvyunlong', age: 18 }
  }
}

export default new UserController()
