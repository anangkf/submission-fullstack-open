import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteSlice'
import { pushNotif, removeNotif } from '../reducers/notifSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const anecdote = formData.get('anecdote')
      dispatch(addAnecdote(anecdote))
      // reset uncontrolled input using react useRef
      ref.current.value = ''

      dispatch(pushNotif(`'${anecdote}' added to the list`))
      setTimeout(() => {
        dispatch(removeNotif())
      }, 5000)
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
