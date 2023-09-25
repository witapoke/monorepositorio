import React, { useState } from 'react'
import Toggable from './Toggable'

export default function ListaDeNotas({ notas, toggleImportance }) {
  const label = notas.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <div>{notas.content}</div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
