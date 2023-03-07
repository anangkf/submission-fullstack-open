import React from 'react'
import { useParams } from 'react-router-dom'

const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find((a) => a.id === Number(id))

  return (
    <>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </>
  )
}

export default AnecdoteDetail