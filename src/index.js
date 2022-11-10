import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './Register.css'
import './Navbar.css'
import { AuthProvider } from './context/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
