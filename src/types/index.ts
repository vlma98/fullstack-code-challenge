import { NextFunction, Request, Response } from 'express'
import { IRepoBase } from '../models/repos/repos.schema'
import { IUserBase } from '../models/users/user.schema'

/**
 * This actually doest not have any effect in type checking.
 * I didn't find an easy way to create a custom Request type that conforms to
 * other Express types.
 */

type OneOrMany<T> = T | T[]

export type AuthedRequest = Request & { user: IUserBase }

export type RequestWithRepo = AuthedRequest & { repo: IRepoBase }

export type Handler<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>

export type AuthedHandler = Handler<AuthedRequest>

export type RepoHandler = Handler<RequestWithRepo>

export type Middleware = OneOrMany<Handler>
export type AuthedMiddleware = OneOrMany<AuthedHandler>
export type RepoMiddleware = OneOrMany<RepoHandler>
