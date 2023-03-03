import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvote } from '../reducers/anecdoteSlice'

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

  const vote = (id) => {
    dispatch(upvote(id))
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
          has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
