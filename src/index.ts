import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
import { userRoutes, authRoute, githubRoutes } from './routes'
import { errorMiddleware } from './middlewares'
import * as dotenv from 'dotenv'
import ctes from './constants'
import path from 'path'

dotenv.config()

const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/auth', authRoute)
app.use('/github', githubRoutes)
app.use(errorMiddleware)

db()
  .then((mg) => {
    const server = app.listen(PORT, () => {
      console.log(`Listening in ${PORT}`)
    })
  })
  .catch((err) => {
    throw err
  })
