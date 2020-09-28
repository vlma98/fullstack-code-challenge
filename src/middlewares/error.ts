import { Request, Response, NextFunction } from 'express'
import * as errors from '../errors'

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const knownErrors = [
    errors.EmailAlreadyTakenError,
    errors.ExpiredTokenError,
    errors.InvalidPasswordError,
    errors.InvalidRequestError,
    errors.InvalidTokenError,
    errors.NoTokenProvidedError,
    errors.NotAuthedError,
    errors.NotAuthorized,
    errors.ResourceNotFound
  ]

  for (const error of knownErrors) {
    if (err instanceof error) {
      return res.status(500).json({ message: err.message })
    }
  }

  return res.status(500).send('Erro no servidor.')
}

export default errorHandler
