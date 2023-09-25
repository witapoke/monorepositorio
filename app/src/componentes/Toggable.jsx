import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import i18n from '../traducciones'
const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}> {buttonLabel} </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {i18n.TOGGABLE.TOGGABLE_CANCEL_BUTTON}
        </button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

// Toggable.propTypes = {
//   buttonLabel: PropTypes.string.isRequired
// }

export default Toggable
