import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SET_AUTHOR_BIRTH } from '../queries/mutations'
import { ALL_AUTHORS } from '../queries/queries'

const INIT_FORM_DATA = {
  name: '',
  born: ''
}

const EditAuthor = () => {
  const [ formData, setFormData ] = useState(INIT_FORM_DATA)
  const [ editAuthor ] = useMutation(SET_AUTHOR_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS } ] ,
    onError: (error) => {
      console.error(error)
    },
    onCompleted: (res) => {
      if (res.editAuthor === null) {
        alert('Author not found!')
      }
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, born } = formData
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setFormData(INIT_FORM_DATA)
  }

  return (
    <>
      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          name
          <input type='text' name='name' value={formData.name} onChange={handleChange} id='name' />
        </label><br />
        <label htmlFor='born'>
          born
          <input type='number' name='born' value={formData.born} onChange={handleChange} id='born' />
        </label><br />
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default EditAuthor