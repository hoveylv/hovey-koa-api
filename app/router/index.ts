import KoaRouter from 'koa-router'

import UserController from '../controllers/user.controller'

const router = new KoaRouter({ prefix: '/api/v1' })

router.get('/user', UserController.find)

export default router
