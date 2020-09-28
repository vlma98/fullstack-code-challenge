import { InvalidRequestError, ResourceNotFound } from '../../errors'
import User from '../../models/users/user.model'
import { Handler } from '../../types'
import jwt from 'jsonwebtoken'
import InvalidPasswordError from '../../errors/InvalidPasswordError'
import { IUserBase } from '../../models/users/user.schema'

const SECRET = 'Not much of a secret'

export const login = async (
  email: string,
  password: string
): Promise<{ user: IUserBase; token: string }> => {
  if (!email || !password) {
    throw new InvalidRequestError(
      '"email" and "password" are required fields in body'
    )
  }
  return User.findOne({ email }).then((user) => {
    if (!user) {
      throw new ResourceNotFound(`User with ${email} as email not found.`)
    }
    if (user.verifyPassword(password)) {
      const token = jwt.sign({ _id: user._id }, SECRET, {
        expiresIn: 60 * 60 * 24
      })
      return { token, user }
    } else {
      throw new InvalidPasswordError('invalid password')
    }
  })
}

export const auth: Handler = async (req, res, next) => {
  const { email, password } = req.body
  return login(email, password)
    .then(({ token, user }) => {
      return res.status(200).json({ token, user })
    })
    .catch(next)
}
