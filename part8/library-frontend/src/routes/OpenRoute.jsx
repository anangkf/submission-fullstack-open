import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

const OpenRoute = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default OpenRoute