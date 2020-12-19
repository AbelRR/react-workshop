// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

const machine = {
  idle: {
    FETCH: 'loading',
  },
  loading: {
    SUCCESS: 'success',
    FAIL: 'error',
  },
  success: {},
  error: {
    RETRY: 'loading',
  },
}

function useStateWithLocalStorage(key, defaultState) {
  const [state, setState] = useReducer(
    (_, newState) => newState,
    localStorage.getItem(key) || defaultState
  )

  useEffect(() => {
    localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function LoginForm({ onAuthenticated }) {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [showPassword, setShowPassword] = useStateWithLocalStorage('abc', false)

  const [state, dispatch] = useReducer(
    (state, event) => {
      const nextState = machine[state.current][event.type]
      return {
        current: nextState,
        ...event.payload,
      }
    },
    {
      current: 'idle',
      error: null,
      user: null,
    }
  )

  const { error, user } = state
  const loading = state.current === 'loading'

  useEffect(() => {
    let isCurrent = true
    if (loading) {
      api.auth
        .login(usernameRef.current.value, passwordRef.current.value)
        .then((user) => {
          if (isCurrent) dispatch({ type: 'SUCCESS', payload: { user } })
        })
        .catch((error) => {
          if (isCurrent) {
            dispatch({ type: 'FAIL', payload: { error } })
          }
        })
    }
    return () => (isCurrent = false)
  }, [loading])

  useEffect(() => {
    if (user && typeof onAuthenticated === 'function') {
      onAuthenticated(user)
    }
  }, [onAuthenticated, user])

  function handleLogin(event) {
    event.preventDefault()
    dispatch({ type: 'FETCH' })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            ref={usernameRef}
            aria-label="Username"
            disabled={loading}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="form-field">
          <input
            // You can pass the ref directly in like above with username,
            // or we can pass a function in and assign the current ourselves
            ref={(node) => (passwordRef.current = node)}
            aria-label="Password"
            disabled={loading}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button" disabled={loading}>
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
