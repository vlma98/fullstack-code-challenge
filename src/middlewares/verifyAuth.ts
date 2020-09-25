import { Handler } from '../types'
import jwt from 'jsonwebtoken'
import NoTokenProvidedError from '../errors/NoTokenProvidedError'
import User from '../models/users/user.model'
import { IUserBase } from '../models/users/user.schema'
import InvalidTokenError from '../errors/InvalidTokenError'

const verifyAuth: Handler = async (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return next(
      new NoTokenProvidedError("Missing token in 'authorization' header")
    )
  }
  const decoded = jwt.decode(token) as { _id: string }
  if (!decoded) {
    return next(
      new Error(
        'Idk what happened, token is not defined afted decoding. Maybe invalid'
      )
    )
  }
  const user = await User.findById(decoded._id)
  if (!user) {
    return next(
      new InvalidTokenError('token provided does not refer to existing user')
    )
  }
  req.user = user
  next()
}

export default verifyAuth
