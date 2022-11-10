import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const SharedPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  )
}

export default SharedPage
