/* eslint-disable eqeqeq */
require('dotenv').config()
require('./mongo.js')

const express = require('express') // IMPORTANDO EXPRESS
const app = express() // CREANDO EL SERVIDOR
const cors = require('cors')
const logger = require('./middlewares/loggerMiddleware.js')
const notFound = require('./middlewares/notFound.js')
const castError = require('./middlewares/castError.js')
const userRouter = require('./routes-controllers/users.js')
const notesRouter = require('./routes-controllers/notes.js')
const loginRouter = require('./routes-controllers/login.js')

app.use(cors())

app.use(express.json()) // USANDO EL PARSER

app.use(express.static('../app/dist'))

app.use(logger)

app.use(notesRouter)

app.use(userRouter)

app.use(loginRouter)

app.use(notFound)

app.use(castError) //  FUNCION PARA CONTROLAR LOS ERRORES

const PORT = process.env.PORT

const server = app.listen(PORT, async () => {
  console.log('Server running on port 3001')
}) // DEFINIENDO EL PUERTO DEL SERVIDOR

module.exports = { app, server }
