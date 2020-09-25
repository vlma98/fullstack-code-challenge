import { InvalidRequestError, ResourceNotFound } from '../../errors'
import User from '../../models/users/user.model'
import { Handler } from '../../types'
import jwt from 'jsonwebtoken'
import InvalidPasswordError from '../../errors/InvalidPasswordError'

const SECRET = 'Not much of a secret'

export const auth: Handler = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(
      new InvalidRequestError(
        '"email" and "password" are required fields in body'
      )
    )
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return next(
        new ResourceNotFound('User with ' + email + ' as email not found')
      )
    }
    if (user.verifyPassword(password)) {
      const token = jwt.sign({ _id: user._id }, SECRET, {
        expiresIn: 60 * 60 * 24
      })
      return res.status(200).json({ token, user })
    } else {
      return next(new InvalidPasswordError('invalid password'))
    }
  })
}
