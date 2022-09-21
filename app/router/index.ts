import KoaRouter from 'koa-router'

import LoginController from '../controllers/login.controller'
import UploadController from '../controllers/upload.controller'
import UserController from '../controllers/user.controller'
import AuthMiddleware from '../middlewares/auth.middleware'

const router = new KoaRouter({ prefix: '/api/v1' })

router.post('/login', LoginController.login)
router.use(AuthMiddleware)
router.get('/user', UserController.find)
router.post('/user', UserController.insert)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.delete)
router.get('/user/:id', UserController.findById)
router.post('/upload', UploadController.upload)

export default router
