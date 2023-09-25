import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import ListaDeNotas from './ListaDeNotas'

test('renderiza el contenido', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<ListaDeNotas notas={note} />)

  component.getByText('This is a test')
  // component.getByText('Eliminar notilla')

  // const li = component.container.querySelector('li')

  // console.log(prettyDOM(li))
})

test('clicking the button calls event handler once ', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <ListaDeNotas notas={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})
