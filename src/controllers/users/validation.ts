import { InvalidRequestError } from '../../errors'
import { IUserBase } from '../../models/users/user.schema'
import { Handler } from '../../types'

/**
 * Request body of user update route
 */
export interface IUpdateUserBody {
  name?: IUserBase['name']
  gender?: IUserBase['gender']
  email?: IUserBase['email']
}

/**
 * Request body of user sign up route
 */
export interface ICreateUserBody {
  name: {
    first: string
    last: string
  }
  email: string
  password: string
  gender: number
}

/**
 * Validates `req.body` checking if it has valid values for keys of `ICreateUserBody`
 * @param req
 * @param res
 * @param next
 *
 * TODO - Validate email format. Check name for invalid chars. Gender possible values.
 */
export const validateCreateUserBody: Handler = async (req, res, next) => {
  const { name, email, password, gender } = req.body as ICreateUserBody
  const errors: string[] = []
  if (!name || !name.first || !name.last) {
    errors.push('Invalid value for field name')
  }
  if (!email) {
    errors.push('Invalid value for field email')
  }
  if (!password) {
    errors.push('Invalid value for field password')
  }
  if (!gender) {
    errors.push('Invalid value for field gender')
  }

  if (errors.length > 0) {
    return next(
      new InvalidRequestError('Errors in request body: ' + errors.join('. '))
    )
  } else {
    next()
  }
}

/**
 * TODO: implement this method
 */
export const validateUpdateUserBody: Handler = async (req, res, next) => {
  next()
}
