const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const loginRouter = express.Router()
const User = require('../models/UserModel')
const path = '/api/login'

loginRouter.get(`${path}`, async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

loginRouter.post(`${path}`, async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: 'Invalid user or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
