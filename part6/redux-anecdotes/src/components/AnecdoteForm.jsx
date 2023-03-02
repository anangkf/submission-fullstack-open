import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const anecdote = formData.get('anecdote')
    dispatch(addAnecdote(anecdote))
    // reset uncontrolled input using react useRef
    ref.current.value = ''
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div><input ref={ref} type='text' name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm