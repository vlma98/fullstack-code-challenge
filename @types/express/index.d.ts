import { IUserBase } from '../../src/models/users/user.schema'
import { IRepoBase } from '../../src/models/repos/repos.schema'
declare global {
  namespace Express {
    interface Request {
      user: IUserBase
      repo: IRepoBase
    }
  }
}
