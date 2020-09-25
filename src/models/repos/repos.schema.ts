import mongoose, { Schema, Document, Types, MongooseDocument } from 'mongoose'
import Constants from '../../constants'
const { githubURL } = Constants

interface IRepoSchema extends Document {
  owner: string
  name: string
  labels: string[]
  _idUser: MongooseDocument['_id']
}

export interface IRepoBase extends IRepoSchema {
  url: string
}

const RepoSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  labels: {
    type: [String]
  },
  _idUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
})

RepoSchema.virtual('url').get(function (this: IRepoBase) {
  return `${githubURL}/${this.owner}/${this.name}`
})

export default RepoSchema
