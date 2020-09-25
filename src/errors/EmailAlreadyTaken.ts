import BaseError from 'ts-base-error'
class EmailAlreadyTakenError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default EmailAlreadyTakenError
