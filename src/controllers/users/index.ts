import { AuthedMiddleware, Middleware } from '../../types'
import User from '../../models/users'
import { EmailAlreadyTakenError, InvalidRequestError } from '../../errors'
import {
  ICreateUserBody,
  IUpdateUserBody,
  validateCreateUserBody,
  validateUpdateUserBody
} from './validation'

export const getUsers: Middleware = async (req, res, next) => {
  return User.find({}).then((users) => {
    return res.status(200).json({ users })
  })
}

export const getUser: AuthedMiddleware = async (req, res, next) => {
  return res.status(200).json({ user: req.user })
}

export const createUser: Middleware = [
  validateCreateUserBody,
  async (req, res, next) => {
    const user = new User(req.body as ICreateUserBody)
    const validationError = user.validateSync()
    if (validationError) {
      return res.status(400).json(validationError.message)
    }
    return user
      .save()
      .then((user) => {
        return res.status(200).json({ user })
      })
      .catch((err) => {
        if (err.code === 11000) {
          return next(
            new EmailAlreadyTakenError(user.email + ' was already taken.')
          )
        } else {
          return next(err)
        }
      })
  }
]

export const updateUser: AuthedMiddleware = [
  validateUpdateUserBody,
  async (req, res, next) => {
    const { user } = req
    const { name, gender, email } = req.body as IUpdateUserBody
    if (name) {
      user.name = name
    }
    if (gender) {
      user.gender = gender
    }
    if (email) {
      user.email = email
    }
    return user
      .save()
      .then((updated) => {
        return res.status(200).json({ user: updated })
      })
      .catch((err) => next(err))
  }
]

export const deleteUser: AuthedMiddleware = async (req, res, next) => {
  const { user } = req
  return User.findByIdAndDelete(user._id)
    .then((deleted) => {
      return res.status(200).json({ user: deleted })
    })
    .catch((err) => next(err))
}
