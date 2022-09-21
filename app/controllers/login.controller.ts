import { Rules } from 'async-validator'
import { Context } from 'koa'
import UserService from '../services/user.service'
import { sign } from '../utils/auth'
import { error, success } from '../utils/response'
import validate from '../utils/validate'

class LoginController {
  async login(ctx: Context) {
    const rules: Rules = {
      code: [
        {
          type: 'string',
          required: true,
          message: '用户名不能为空',
        },
      ],
      password: [
        {
          type: 'string',
          required: true,
          message: '密码不能为空',
        },
      ],
    }
    interface IUser {
      code: string
      password: string
    }
    const { data, err } = await validate<IUser>(ctx, rules)
    if (err !== null) {
      return error(ctx, err)
    }
    const user = await UserService.getUserByUserInfo(data.code, data.password)
    if (!user) {
      return error(ctx, '用户名或密码错误', {})
    }
    const token = sign(user)

    success(ctx, { token })
  }
}

export default new LoginController()
