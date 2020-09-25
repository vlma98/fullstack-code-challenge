import BaseError from 'ts-base-error'
class ExpiredTokenError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default ExpiredTokenError
