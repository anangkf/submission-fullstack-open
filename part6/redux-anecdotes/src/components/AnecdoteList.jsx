import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  // eslint-disable-next-line no-shadow
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = filter
      ? anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvote(id))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
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
