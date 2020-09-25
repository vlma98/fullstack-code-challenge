import mongoose from 'mongoose'
import RepoSchema, { IRepoBase } from './repos.schema'

const Repo = mongoose.model<IRepoBase>('Repo', RepoSchema)

export default Repo
