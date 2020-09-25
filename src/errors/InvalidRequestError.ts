import BaseError from 'ts-base-error'

class InvalidRequestError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default InvalidRequestError
