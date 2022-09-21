import Schema, { Rules, Values } from 'async-validator'
import { Context } from 'koa'

async function validate<T extends Values>(
  ctx: Context,
  rules: Rules,
  flag = false
): Promise<{ data: T; err: any | null }> {
  const validator = new Schema(rules)
  let data: any

  switch (ctx.method) {
    case 'GET':
      break
    case 'POST':
      data = getFormData(ctx)
      break
    case 'PUT':
      data = getFormData(ctx)
      break

    case 'DELETE':
      break
  }

  return await validator
    .validate(data)
    .then(() => {
      return {
        data: data as T,
        err: null,
      }
    })
    .catch(err => {
      if (flag) {
        return {
          data: {} as T,
          err,
        }
      }
      return {
        data: {} as T,
        err: err.errors[0].message,
      }
    })
}

function getFormData(ctx: Context) {
  return ctx.request.body
}

export default validate
