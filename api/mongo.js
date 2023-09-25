require('dotenv').config()
const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI // ESTABLECIENDO SI USAS LA BASE DE DATOS DE TEST O DE PRODUCCION

// conexion a mongodb

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('database connected')
  })
  .catch((error) => {
    console.error(error)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
