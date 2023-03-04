import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, upvote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/notifSlice'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-shadow
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = filter
      ? anecdotes.filter(({ content }) => content.toLowerCase().includes(filter))
      : anecdotes
    return filteredAnecdotes
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = async (anecdote) => {
    const { content } = anecdote
    try {
      dispatch(upvote(anecdote))
      dispatch(setNotification(`You voted '${content}'`, 5))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
          has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
