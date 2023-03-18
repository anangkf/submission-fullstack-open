import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Layout from '../pages/Layout'
import Users from '../pages/Users'

const DefaultRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<App />} />
          <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default DefaultRoutes