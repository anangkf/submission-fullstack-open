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
    <table>
      <thead>
        <tr>
          <td></td>
          <td><b>blogs created</b></td>
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