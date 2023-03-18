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
    <div>
      {name && <Navigation />}
      <div className='container-2xl px-2 w-full flex flex-col gap-3 p-2'>
        <Notification type={notif.type} message={notif.message} />
        <h2 className='text-xl font-bold'>blogs</h2>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout