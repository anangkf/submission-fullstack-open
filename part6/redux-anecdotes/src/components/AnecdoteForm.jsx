import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notifSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const content = formData.get('anecdote')
      dispatch(addAnecdote({ content, votes: 0 }))
      // reset uncontrolled input using react useRef
      ref.current.value = ''

      dispatch(setNotification(`'${content}' added to the list`, 5))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input ref={ref} type='text' name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
