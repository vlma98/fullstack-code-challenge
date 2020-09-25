import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://localhost/gh-issues-tracker'

export default async () => {
  return mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
}
