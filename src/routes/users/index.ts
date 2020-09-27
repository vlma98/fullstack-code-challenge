import express from 'express'
import reposRoutes from '../repos'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../../controllers/users'
import verifyAuth from '../../middlewares/verifyAuth'

const router = express.Router()

router.get('/', getUsers)

router.get('/me', getUser)

router.post('/', createUser)

router.put('/me', verifyAuth, updateUser)

router.delete('/me', verifyAuth, deleteUser)

router.use('/me/repos', verifyAuth, reposRoutes)

export default router
