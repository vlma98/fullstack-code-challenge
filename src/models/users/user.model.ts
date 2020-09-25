import mongoose from 'mongoose'
import UserSchema, { IUserBase } from './user.schema'

const User = mongoose.model<IUserBase>('User', UserSchema)

export default User
