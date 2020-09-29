import { AuthedMiddleware, AuthedHandler, RepoMiddleware } from '../../types'
import Repo from '../../models/repos'
import { NotAuthorized, ResourceNotFound } from '../../errors'
import {
  ICreateRepo,
  IUpdateRepoBody,
  validateCreateRepoBody,
  validateUpdateRepoBody
} from './validation'
export const getRepos: AuthedMiddleware = async (req, res, next) => {
  const { user } = req
  return Repo.find({ _idUser: user._id })
    .then((repos) => {
      return res.status(200).json({ repos })
    })
    .catch((err) => next(err))
}

export const getRepo: RepoMiddleware = async (req, res, next) => {
  return res.status(200).json({ repo: req.repo })
}

export const getRepoOrThrow: AuthedHandler = async (req, res, next) => {
  const { id } = req.params
  Repo.findById(id).then((repo) => {
    if (!repo) {
      return next(new ResourceNotFound('Repo with id ' + id + ' not found'))
    }
    if (!req.user._id.equals(repo._idUser)) {
      return next(new NotAuthorized('this aint a repo of yours'))
    }
    req.repo = repo
    next()
  })
}

export const createRepo: AuthedMiddleware = [
  validateCreateRepoBody,
  async (req, res, next) => {
    const { user } = req
    const { owner, labels, name } = req.body as ICreateRepo
    const repo = new Repo({
      _idUser: user._id,
      owner,
      name,
      labels
    })
    return repo
      .save()
      .then((r) => {
        return res.status(200).json({ repo: r })
      })
      .catch((err) => next(err))
  }
]

export const updateRepo: RepoMiddleware = [
  validateUpdateRepoBody,
  async (req, res, next) => {
    const { owner, labels, name } = req.body as IUpdateRepoBody
    let { repo } = req

    if (owner) repo.owner = owner
    if (name) repo.name = name
    if (labels) repo.labels = labels

    return repo
      .save()
      .then((newRepo) => {
        return res.status(200).json({ repo: newRepo })
      })
      .catch(next)
  }
]

export const deleteRepo: AuthedMiddleware = async (req, res, next) => {
  const { id } = req.params
  Repo.findByIdAndDelete(id)
    .then((repo) => {
      return res.status(200).json({ repo })
    })
    .catch(next)
}
