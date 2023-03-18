import React from 'react'

const UserData = ({ user }) => {

  return (
    <tr>
      <td>{ user.name }</td>
      <td>{ user.blogs.length }</td>
    </tr>
  )
}

export default UserData