import { Context } from 'koa'

/**
 * @author: hovey <hovey.lv@qq.com>
 * @description: 返回成功的数据
 * @param {Context} ctx 上下文
 * @param {*} data 返回数据
 * @param {string} msg 错误信息
 * @param {number} code 状态码 0:成功 1:失败
 */
function success<T>(ctx: Context, data: T | T[] = [], msg = 'success', code = 0) {
  ctx.body = {
    code,
    msg,
    data,
  }
}

/**
 * @author: hovey <hovey.lv@qq.com>
 * @description: 返回失败的数据
 * @param {Context} ctx 上下文
 * @param {string} msg 错误信息
 * @param {*} data 返回数据
 * @param {number} code 状态码 0:成功 1:失败
 */
function error<T>(ctx: Context, msg = 'error', data: T | T[] = [], code = 1) {
  ctx.body = {
    code,
    msg,
    data,
  }
}

export { success, error }
