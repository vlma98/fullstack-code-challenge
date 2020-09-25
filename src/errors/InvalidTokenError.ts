import BaseError from 'ts-base-error'

class InvalidTokenError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default InvalidTokenError
