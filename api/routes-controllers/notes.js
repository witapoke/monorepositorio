const userExtractor = require('../middlewares/userExtractor')
const Note = require('../models/NoteModel')
const User = require('../models/UserModel')
const express = require('express')
const notesRouter = express.Router()
// const jwt = require('jsonwebtoken')
const path = '/api/notes'

notesRouter.get('/', (request, response) => {
  response.send('<h1>Como anda la banda muchachos</h1>')
})

notesRouter.get(`${path}`, async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

notesRouter.get(`${path}/:id`, async (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

notesRouter.put(
  `${path}/:id`,
  userExtractor,
  async (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
      content: note.content,
      important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) =>
      response.json(result)
    )
  }
)

notesRouter.delete(
  `${path}/:id`,
  userExtractor,
  async (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndDelete(id)
      .then(() => response.status(204).end())
      .catch(next)
  }
)

notesRouter.post(`${path}`, userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body

  const { IdUsuario } = request

  const user = await User.findById(IdUsuario)

  if (!content) {
    return response.status(400).json({
      error: 'required field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const notaGuardada = await newNote.save()

    user.notes = user.notes.concat(notaGuardada._id)

    await user.save()

    response.json(notaGuardada)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
