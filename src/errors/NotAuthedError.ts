import BaseError from 'ts-base-error'

class NotAuthedError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default NotAuthedError
