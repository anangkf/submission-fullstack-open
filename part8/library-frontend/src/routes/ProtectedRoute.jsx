import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Auth from '../utils/Auth'

const ProtectedRoute = () => {
  if (Auth.isAuthorized()) {
    return <Navigate to={'/authors'} replace />
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default ProtectedRoute