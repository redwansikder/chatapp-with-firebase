import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import axios from './api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register____'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(name)
    setValidName(result)
  }, [name])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [name, pwd, matchPwd])

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
        REGISTER_URL,
        JSON.stringify({ name, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(JSON.stringify(response))
      setSuccess(true)
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No server response         ')
      } else if (error.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <React.Fragment>
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
              Username:
              {nameFocus && (
                <FontAwesomeIcon
                  icon={validName ? faCheck : faTimes}
                  className={validName ? 'valid' : 'invalid'}
                />
              )}
            </label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setNameFocus(true)}
            />
            <p
              id='uidnote'
              className={nameFocus && !validName ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor='password'>
              Password:
              {pwdFocus && (
                <FontAwesomeIcon
                  icon={validPwd ? faCheck : faTimes}
                  className={validPwd ? 'valid' : 'invalid'}
                />
              )}
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
            />
            <p
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:
              <span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span>
              <span aria-label='hashtag'>#</span>
              <span aria-label='dollar sign'>$</span>
              <span aria-label='parcent'>%</span>
            </p>

            <label htmlFor='confirm_pwd'>
              Confirm Password:
              {matchFocus && (
                <FontAwesomeIcon
                  icon={validMatch && matchPwd ? faCheck : faTimes}
                  className={validMatch && matchPwd ? 'valid' : 'invalid'}
                />
              )}
            </label>
            <input
              type='password'
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
            />
            <p
              id='confirmnote'
              className={matchFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered? <br />
            <span className='line'>
              <Link to='/signin'>Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </React.Fragment>
  )
}

export default Register
