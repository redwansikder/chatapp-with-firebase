import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/App.css'
import SharedPage from './SharedPage'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import ChatList from './ChatList'
import Error from './Error'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedPage />}>
            <Route index element={<Main />} />
            <Route path='register' element={<Register />} />
            <Route path='signin' element={<Login />} />
            <Route path='chat' element={<ChatList />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
