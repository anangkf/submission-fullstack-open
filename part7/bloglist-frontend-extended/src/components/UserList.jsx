import React, { useEffect, useState } from 'react'
import userService from '../services/user.service'
import UserData from './UserData'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then((res) => setUsers(res))
      .catch((err) => console.error(err))
  }, [])

  return (
    <table className='w-1/2 border border-collapse'>
      <thead>
        <tr className='border border-collapse'>
          <td className='p-2'></td>
          <td className='p-2'><b>blogs created</b></td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <UserData key={user.id} user={user} />
          )
        })}
      </tbody>
    </table>
  )
}

export default UserList