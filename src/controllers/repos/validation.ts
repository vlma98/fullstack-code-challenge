import { AuthedHandler } from '../../types'

export interface ICreateRepo {
  owner: string
  name: string
  labels: string[]
}

export const validateCreateRepoBody: AuthedHandler = async (req, res, next) => {
  const { owner, name, labels } = req.body as ICreateRepo
  // to do validate input agains github
  return next()
}

export interface IUpdateRepoBody {
  owner?: string
  name?: string
  labels?: string
}

export const validateUpdateRepoBody: AuthedHandler = async (req, res, next) => {
  const { owner, name, labels } = req.body as IUpdateRepoBody
  const { id } = req.body
  // to do validate input agains github
  return next()
}
