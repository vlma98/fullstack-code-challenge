import express from 'express'
import * as controllers from '../../controllers/repos'

const router = express.Router()

router.param('id', controllers.getRepoOrThrow)

router.get('/', controllers.getRepos)

router.get('/:id', controllers.getRepo)

router.post('/', controllers.createRepo)

router.put('/:id', controllers.updateRepo)

router.delete('/:id', controllers.deleteRepo)

export default router
