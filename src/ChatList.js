import React, { useContext } from 'react'

import AuthContext from './context/AuthProvider'

function ChatList() {
  const { auth, post, setPost, posts, createMsg, getAllMsg } =
    useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!post.msg) {
      return
    }
    createMsg(post)
    setPost({ writer: '', msg: '' })
    getAllMsg()
  }

  return (
    <div className=' chatlist'>
      <div>
        {auth &&
          posts.map((singlePost, index) => (
            <p key={index}>
              <span className='writerName'>{singlePost.writer}: </span>
              {singlePost.msg}
            </p>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Type here...'
          value={post.msg}
          onChange={(e) => {
            e.stopPropagation()

            setPost({
              writer: auth?.providerData[0].uid,
              msg: e.target.value,
            })
          }}
        />
      </form>
    </div>
  )
}

export default ChatList
