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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail