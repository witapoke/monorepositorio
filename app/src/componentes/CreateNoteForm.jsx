import React, { useState, useRef } from 'react'
import Toggable from './Toggable'
export default function CreateNoteForm({ handleLogOut, addNote }) {
  const [newNote, setNewNote] = useState('')

  const elementRef = useRef()

  const createNote = (e) => {
    e.preventDefault()

    const addedNote = {
      content: newNote,
      important: Math.random() > 0.5
    }

    addNote(addedNote)
    setNewNote('')
    elementRef.current.toggleVisibility()
  }

  return (
    <Toggable ref={elementRef} buttonLabel='New Note'>
      <h3>Crea tu nueva nota!!</h3>
      <form onSubmit={createNote}>
        <input
          type='text'
          id='create'
          onChange={({ target }) => setNewNote(target.value)}
          placeholder='Añadir nota'
          value={newNote}
        />
        <button>Send</button>
      </form>
      <button onClick={handleLogOut}>Cerrar sesion </button>
    </Toggable>
  )
}
