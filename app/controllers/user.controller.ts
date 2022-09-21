import { createHash } from 'crypto'
import { Rules } from 'async-validator'
import { Context } from 'koa'
import logger from '../logger'
import UserService from '../services/user.service'
import paginate from '../utils/paginate'
import { error, success } from '../utils/response'
import validate from '../utils/validate'

class UserController {
  async find(ctx: Context) {
    const params = new URLSearchParams(ctx.querystring)
    const page = params.get('page') !== null && !isNaN(Number(params.get('page'))) ? Number(params.get('page')) : 1
    const limit = params.get('limit') !== null && !isNaN(Number(params.get('limit'))) ? Number(params.get('limit')) : 15
    const { rows, count } = await UserService.getUserListByPage(page, limit)
    success(ctx, paginate(rows, page, count, limit))
  }

  async findById(ctx: Context) {
    const id = ctx.params.id
    const user = await UserService.getUserById(id as number)
    if (user) {
      success(ctx, { user })
    } else {
      error(ctx, '用户不存在', {})
    }
  }

  async insert(ctx: Context) {
    const rules: Rules = {
      name: [
        {
          type: 'string',
          required: true,
          message: '姓名不能为空',
        },
      ],
      code: [
        {
          type: 'string',
          required: true,
          message: '用户名不用能为空',
        },
      ],
      password: [
        {
          type: 'string',
          required: true,
          message: '密码不能为空',
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
        },
      ],
    }

    interface IUser {
      name: string
      code: string
      password: string
    }

    const { data, err } = await validate<IUser>(ctx, rules)
    if (err !== null) {
      return error(ctx, err)
    }
    const user = await UserService.getUserByUserCode(data.code)
    if (user !== null) {
      return error(ctx, '用户已存在')
    }
    data.password = createHash('md5').update(data.password).digest('hex')
    const row = await UserService.insert(data)
    if (row.id > 0) {
      return success(ctx)
    }
    return error(ctx, '插入失败')
  }

  async update(ctx: Context) {
    const id = ctx.params.id as number
    const user = await UserService.getUserById(id)

    if (user === null) {
      return error(ctx, '用户不存在')
    }

    const rules: Rules = {
      name: [
        {
          type: 'string',
          required: true,
          message: '姓名不能为空',
        },
      ],

      password: [
        {
          type: 'string',
          required: true,
          message: '密码不能为空',
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
        },
      ],
    }

    interface IUser {
      name: string
      code: string
      password: string
    }

    const { data, err } = await validate<IUser>(ctx, rules)

    if (err !== null) {
      error(ctx, err)
    }
    if (data.password !== undefined && data.password !== '') {
      data.password = createHash('md5').update(data.password).digest('hex')
    }

    const [number] = await UserService.update(id, data)
    if (number > 0) {
      return success(ctx)
    } else {
      return error(ctx, '更新失败')
    }
  }

  async delete(ctx: Context) {
    const id = ctx.params.id as number
    const user = await UserService.getUserById(id)
    if (user === null) {
      return error(ctx, '用户不存在无法删除')
    }
    const row = await UserService.delete(id)
    if (row > 0) {
      return success(ctx)
    }
    return error(ctx, '删除失败')
  }
}

export default new UserController()
