import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'
import NameSchema, { IName } from '../subtypes/name'

enum Gender {
  Male = 0,
  Female = 1,
  Neutral = 2
}

interface IUserSchema extends Document {
  name: IName
  email: string
  password: string
  gender: Gender
  active: false
}

const UserSchema = new mongoose.Schema({
  name: NameSchema,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: typeof Gender,
    enum: [0, 1, 2],
    default: 2,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  }
})

export interface IUserBase extends IUserSchema {
  fullName: string
  verifyPassword: (candidate: string) => Promise<boolean>
}
UserSchema.methods.verifyPassword = function (candidate: string) {
  return bcrypt.compareSync(candidate, this.password)
}
UserSchema.virtual('fullName').get(function (this: IUserBase) {
  return this.name.first + ' ' + this.name.last
})
UserSchema.virtual('fullName').set(function (this: IUserBase, value: string) {
  const [first, ...rest] = value.split(' ')
  this.name.first = first
  this.name.last = rest.join(' ')
})
UserSchema.pre<IUserBase>('save', function () {
  if (this.isModified('password'))
    this.password = bcrypt.hashSync(this.password, 10)
})

export default UserSchema
