import React from 'react'
import { Link } from 'react-router-dom'

const UserData = ({ user }) => {

  return (
    <tr className='border border-collapse'>
      <td className='border border-collapse p-2'><Link className="text-sky-800 hover:underline" to={`/users/${user.id}`}>{ user.name }</Link></td>
      <td className='border border-collapse p-2 font-semibold'>{ user.blogs.length }</td>
    </tr>
  )
}

export default UserData