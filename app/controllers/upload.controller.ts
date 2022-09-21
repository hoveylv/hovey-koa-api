import fs from 'fs'
import path from 'path'
import { Context } from 'koa'
import { File } from 'formidable'
import { error, success } from '../utils/response'
import { randomStr } from '../utils'

class UploadController {
  upload(ctx: Context) {
    const files = ctx.request.files?.file
    if (files) {
      if (Array.isArray(files)) {
        error(ctx, '仅支持单文件上传')
      } else {
        const file = files as File

        const fileType = file.mimetype
        const typeSet = new Set(['image/jpeg', 'image/jpg', 'image/gif', 'image/png'])

        if (!typeSet.has(fileType!)) {
          return error(ctx, '非法上传不被允许')
        }

        const reader = fs.createReadStream(file.filepath)
        const ext = path.extname(file.originalFilename!)

        const filePath = `/uploads/${randomStr(32)}${ext}`

        const writer = fs.createWriteStream(`${path.join(__dirname, '../..', 'public')}${filePath}`)
        reader.pipe(writer)
        success(ctx, { file: filePath })
      }
    } else {
      error(ctx, '文件不能为空')
    }
  }
}

export default new UploadController()
