const moongose = require('mongoose')
const { server } = require('../index')
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { api, getAllUsers } = require('./helpers')
describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'miduroot', passwordHash })
    await user.save()
  })

  test('puede crear un username nuevo', async () => {
    const usersAtStart = await getAllUsers()

    const nuevoUsuario = {
      username: 'nachodev',
      name: 'ignacio',
      password: 'unodostrescuatro'
    }

    await api
      .post('/api/users')
      .send(nuevoUsuario)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(nuevoUsuario.username)
  })

  test('falla si el nombre de usuario ya esta tomado ', async () => {
    const usersAtStart = await getAllUsers()

    const nuevoUsuario = {
      username: 'miduroot',
      name: 'midu',
      password: 'unodostrescuatro'
    }

    const result = await api
      .post('/api/users')
      .send(nuevoUsuario)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getAllUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    moongose.connection.close()
    server.close()
  })
})
