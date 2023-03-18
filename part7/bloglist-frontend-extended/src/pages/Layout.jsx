import Cookies from 'js-cookie';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import Notification from '../components/Notification';
import { logout } from '../store/features/authSlice';

const Layout = () => {
  const name = useSelector(state => state.auth.name) || Cookies.get('name')
  const notif = useSelector(state => state.notif)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  };

  return (
    <>
      {name && 
        <>
          <Notification type={notif.type} message={notif.message} />
          <h2>blogs</h2>
          <p>
            {`${name} logged in`}
          </p>
          <button onClick={handleLogout}>logout</button>
        </>}
      <Outlet />
    </>
  )
}

export default Layout