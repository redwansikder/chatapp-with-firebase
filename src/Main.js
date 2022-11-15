import { useContext } from 'react'

import AuthContext from './context/AuthProvider'

export default function Main() {
  const { auth } = useContext(AuthContext)
  return (
    <div className='container '>
      <article style={{ textAlign: 'center' }}>
        <hr />
        <h1>Want a group chat? </h1>
        <p>Create an id and start chatting.</p>
        <hr />
        {auth && (
          <h1 className='writerName' style={{ borderRadius: '2em' }}>
            {auth?.providerData[0].uid}
          </h1>
        )}
      </article>
    </div>
  )
}
