import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/user.service'

const INIT_USER ={
  id: '',
  name: '',
  username: '',
  blogs: []
}

const UserDetail = () => {
  const [user, setUser] = useState(INIT_USER)
  const {id} = useParams()

  useEffect(() => {
    userService
      .getById(id)
      .then((res) => setUser(res))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h2 className='text-xl font-bold'>{user.name}</h2>
      <h3 className='text-lg font-bold'>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li className='bg-slate-100 m-1 w-max py-1 px-2 rounded-sm' key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail