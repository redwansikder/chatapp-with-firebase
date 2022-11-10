import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  return (
    <nav className='navigation'>
      <Link to='/' className='brand-name'>
        RedSoft
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
          <li className=''>
            <Link to='signin'>Sign In</Link>
          </li>
          <li className=''>
            <Link to='register'>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
