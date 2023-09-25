const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const User = require('../models/UserModel')

const initialNotes = [
  {
    content: 'Aprendiendo fullstack con midudev',
    date: new Date(),
    important: true
  },
  {
    content: 'Que feo es el backend',
    date: new Date(),
    important: true
  },
  {
    content: 'Nota probandooooo a',
    date: new Date(),
    important: true
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')

  return {
    contenidos: response.body.map((note) => note.content),
    response
  }
}

const getAllUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map((user) => user.toJSON())
}

module.exports = { initialNotes, api, getAllContentFromNotes, getAllUsers }
