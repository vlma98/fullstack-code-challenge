import mongoose from 'mongoose'

export interface IName {
  first: string
  last: string
}

const NameSchema = new mongoose.Schema({
  first: {
    type: String
  },
  last: {
    type: String
  }
})

export default NameSchema
