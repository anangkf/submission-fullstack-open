import React from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/Auth'

const Navigation = () => {
  const navigate = useNavigate()
  const authStatus = Auth.isAuthorized()

  const handleAuth = () => {
    authStatus 
      ? Auth.logout(navigate)
      : navigate('/')
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <button onClick={() => navigate('/authors')}>authors</button>
      <button onClick={() => navigate('/books')}>books</button>
      {authStatus && <button onClick={() => navigate('/add')}>add book</button>}
      <button onClick={handleAuth}>
        {authStatus ? 'logout' : 'login'}
      </button>
    </div>
  )
}

export default Navigation