import BaseError from 'ts-base-error'

class ResourceNotFound extends BaseError {
  constructor(msg: string) {
    super(msg)
  }
}

export default ResourceNotFound
