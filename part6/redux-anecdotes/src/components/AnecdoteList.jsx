import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvote } from '../reducers/anecdoteSlice'
import { pushNotif, removeNotif } from '../reducers/notifSlice'

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

  const vote = async (id, content) => {
    try {
      dispatch(upvote(id))
      dispatch(pushNotif(`You voted '${content}'`))
      setTimeout(() => {
        dispatch(removeNotif())
      }, 5000)
    } catch (error) {
      console.log(error)
    }
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
