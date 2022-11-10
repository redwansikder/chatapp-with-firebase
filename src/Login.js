import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from './context/AuthProvider'
import axios from './api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const LOGIN_URL = '/signin____'

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [name, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(name)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      console.log(name, pwd)
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({ name, pwd, roles, accessToken })
      setSuccess(true)
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No server response         ')
      } else if (error.response?.status === 400) {
        setErrMsg('Username or password is missing')
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button disabled={!name || !pwd ? true : false}>Sign Up</button>
      </form>
      <p>
        Don't have account? <br />
        <span className='line'>
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </section>
  )
}

export default Login
