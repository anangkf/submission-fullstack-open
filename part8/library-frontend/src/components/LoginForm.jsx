import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../queries/mutations'
import Auth from '../utils/Auth'

const INIT_FORM = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const [ formData, setFormData ] = useState(INIT_FORM)
  const navigate = useNavigate()

  const [ login ] = useMutation(LOGIN, {
    onCompleted: (res) => {
      Auth.storeToken(res.login.value)
      alert('logged in!')
      navigate('/authors')
    },
    onError: (err) => {
      alert(err.graphQLErrors[0].message)
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: formData })
      .then(() => setFormData(INIT_FORM))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          name
          <input type="text" name="username" value={formData.username} onChange={handleChange} id="username" />
        </label><br />
        <label htmlFor="pasword">
          password
          <input type="password" name="password" value={formData.password} onChange={handleChange} id="password" />
        </label><br />
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm