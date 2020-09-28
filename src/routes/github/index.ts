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
  console.log('getting issues')
  getIssues(owner, name, labels ? labels.split(',') : [], 'open')
    .then((issues) => {
      return res.status(200).json({ issues: [] })
    })
    .catch(next)
})

export default router
