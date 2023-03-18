import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/features/authSlice'
import styles from '../styles/navigation.module.css'

const navs = [
  {
    id: 1,
    label: 'blogs',
    path: '/'
  },
  {
    id: 2,
    label: 'users',
    path: '/users'
  }
]

const Navigation = () => {
  const name = useSelector(state => state.auth.name) || Cookies.get('name')
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  };

  return (
    <div className='flex items-center bg-lilac p-2 gap-2'>
      <nav>
        <ul className={styles.navWrapper}>
          {navs.map((nav) => (
            <li key={nav.id} className='hover:text-red-700 underline underline-offset-2' >
              <Link to={nav.path} >{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <span>
        {`${name} logged in`}
      </span>
      <button className='bg-red-danger hover:bg-red-danger-darken px-2 rounded-sm' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation