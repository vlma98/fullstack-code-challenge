import express from 'express'
import bodyParser from 'body-parser'
import db from './db'
import { userRoutes, authRoute, githubRoutes } from './routes'
import { errorMiddleware } from './middlewares'
import ctes from './constants'
const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ctes.clientUrl)
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

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
