import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Auth from '../utils/Auth'

const PrivateRoute = () => {
  if (!Auth.isAuthorized()) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default PrivateRoute