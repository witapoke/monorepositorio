import React from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'

export default function LoginForm(props) {
  return (
    <Toggable buttonLabel='Iniciar sesion' >
      <form onSubmit={props.handleLoginSubmit}>
        <div>
          <input
            type='text'
            value={props.username}
            name='username'
            placeholder='username'
            onChange={props.handleUsnChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='password'
            placeholder='password'
            onChange={props.handlePswChange}
          />
        </div>
        <button>Login</button>
      </form>
    </Toggable>
  )
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsnChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePswChange: PropTypes.func.isRequired
}
