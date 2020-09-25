import BaseError from 'ts-base-error'

class InvalidPasswordError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default InvalidPasswordError
