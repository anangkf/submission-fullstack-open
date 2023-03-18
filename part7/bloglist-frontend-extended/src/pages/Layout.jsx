import Cookies from 'js-cookie';
import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation';
import Notification from '../components/Notification';

const Layout = () => {
  const name = useSelector(state => state.auth.name) || Cookies.get('name')
  const notif = useSelector(state => state.notif)

  return (
    <>
      {name && 
        <>
          <Navigation />
          <Notification type={notif.type} message={notif.message} />
          <h2>blogs</h2>
        </>}
      <Outlet />
    </>
  )
}

export default Layout