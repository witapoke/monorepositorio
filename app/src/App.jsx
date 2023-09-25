/* eslint-disable no-unused-vars */
/* eslint-disable n/handle-callback-err */
import React, { useState, useEffect } from 'react'
import { getAllNotes, create, update, setToken } from './servicios/Funciones'
import { login } from './servicios/login'
import LoginForm from './componentes/LoginForm'
import CreateNoteForm from './componentes/CreateNoteForm'
import ListaDeNotas from './componentes/ListaDeNotas'

export default function App () {
  const [errorMessage, setErrorMessage] = useState('')
  const [notas, setNotas] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotas(data)
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const usuario = JSON.parse(loggedUser)
      setUser(usuario)
      setToken(usuario.token)
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const createNote = (addedNote) => {
    create(addedNote).then((data) => {
      setNotas(notas.concat(data))
    })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const usuario = await login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(usuario))

      setToken(usuario.token)
      setUser(usuario)
      console.log(usuario)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Tus credenciales están como el orto')
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notas.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    update(id, changedNote)
      .then((returnedNote) => {
        setNotas(notas.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Listita de notas</h1>

      {user
        ? (
          <CreateNoteForm handleLogOut={handleLogOut} addNote={createNote} />
          )
        : (
          <LoginForm
            handleLoginSubmit={handleLoginSubmit}
            username={username}
            password={password}
            handleUsnChange={({ target }) => setUsername(target.value)}
            handlePswChange={({ target }) => setPassword(target.value)}
          />
          )}

      <div>
        <ul>
          {notas.map((note, i) => (
            <ListaDeNotas
              key={i}
              notas={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
