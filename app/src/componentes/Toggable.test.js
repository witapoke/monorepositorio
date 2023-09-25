import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Toggable from './Toggable'
import i18n from '../traducciones'
describe('<Toggable/>', () => {
  const buttonLabel = 'show'
  let component
  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>testDiv Content</div>
      </Toggable>
    )
  })

  test('should render its children', () => {
    component.getByText('testDiv Content')
  })

  test('should render its children but its no visible', () => {
    const el = component.getByText('testDiv Content')
    expect(el.parentNode).toHaveStyle('display:none')
  })

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDiv Content')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggabble can be canceled ', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('testDiv Content')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText(
      i18n.TOGGABLE.TOGGABLE_CANCEL_BUTTON
    )

    fireEvent.click(cancelButton)
  })
})
