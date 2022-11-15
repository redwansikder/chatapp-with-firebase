import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import AuthContext from './context/AuthProvider'

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { signOut, auth } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }
  return (
    <nav className='navigation'>
      <Link to='/' className='brand-name'>
        GroupChat
      </Link>
      <button
        className='hamburger'
        onClick={() => {
          setIsNavExpanded((preVal) => !preVal)
        }}
      >
        <FontAwesomeIcon icon={faList} />
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu '
        }
      >
        <ul>
          <li className='active'>
            <Link to='/'>Home</Link>
          </li>
          {auth ? (
            <li className=''>
              <Link to='/chat'>Chat</Link>
            </li>
          ) : (
            <li className=''>
              <Link to='signin'>Sign In</Link>
            </li>
          )}
          {auth ? (
            <li className=''>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          ) : (
            <li className=''>
              <Link to='register'>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
