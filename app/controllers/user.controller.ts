import { Context } from 'koa'
import logger from '../logger'
import userService from '../services/user.service'

class UserController {
  async find(ctx: Context) {
    const user = await userService.getUser()
    ctx.body = user
  }
}

export default new UserController()
