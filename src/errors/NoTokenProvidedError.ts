import BaseError from 'ts-base-error'

class NoTokenProvidedError extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default NoTokenProvidedError
