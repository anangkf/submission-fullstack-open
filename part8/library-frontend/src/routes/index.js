import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'
import OpenRoute from './OpenRoute'
import Authors from '../components/Authors'
import Books from '../components/Books'
import LoginForm from '../components/LoginForm'
import NewBook from '../components/NewBook'

const SetupRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<LoginForm />} />
        </Route>
        {/* private routes */}
        <Route path='/' element={<PrivateRoute />}>
          <Route path='add' element={<NewBook />} />
        </Route>
        {/* open routes */}
        <Route path='/' element={<OpenRoute />}>
          <Route path='authors' element={<Authors />} />
          <Route path='books' element={<Books />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default SetupRouter