import express from 'express'
import { getIssues } from '../../services/github'

const router = express.Router()

router.get('/:owner/:name/issues', async (req, res, next) => {
  const { owner, name } = req.params
  const { labels } = req.query as { [key: string]: string }

  if (!owner || !name) {
    return res
      .status(400)
      .json({ message: `owner and name are required values.` })
  }

  getIssues(owner, name, labels ? labels.split(',') : [], 'open')
})

export default router
