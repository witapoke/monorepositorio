const moongose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/NoteModel')
const { initialNotes, api, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({}) // EL OBJETO VACIO SIGNIFICA QUE SEÑALAS TODAS LAS NOTAS

  // const notesObject = initialNotes.map((note) => new Note(note))
  // const promises = notesObject.map((note) => note.save())
  // await Promise.all(promises)

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }

  // const note1 = new Note(initialNotes[0])
  // await note1.save()

  // const note2 = new Note(initialNotes[1])
  // await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const { contenidos } = await getAllContentFromNotes()

  expect(contenidos).toContain('Aprendiendo fullstack con midudev')
})

test('a new note can be added', async () => {
  const nuevaNota = {
    content: 'Esto es el contenido de la nueva nota',
    important: true
  }

  await api
    .post('/api/notes')
    .send(nuevaNota)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contenidos, response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length + 1)

  expect(contenidos).toContain(nuevaNota.content)
})

test('a note without content cant be added', async () => {
  const nuevaNota = {
    important: true
  }

  await api.post('/api/notes').send(nuevaNota).expect(400)

  const { response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length + 1)
})

test('a note can be deleted', async () => {
  const { response: firtResponse } = await getAllContentFromNotes()
  const { body: notes } = firtResponse
  const noteToDelete = notes[0]
  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

  const { contenidos, response: secondResponse } =
    await getAllContentFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contenidos).not.toContain(noteToDelete.content) // PARA VER QUE LA NOTA BORRADA FUE CORRECTA
})

test('a note that doesnt existe cant be deleted', async () => {
  await api.delete('/api/notes/12314').expect(400)

  const { response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  moongose.connection.close()
  server.close()
})
