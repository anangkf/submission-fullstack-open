import React from 'react'

const Anecdotes = ({data, selected, points}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{data[selected]}</p>
      <p>has {points[selected]} votes</p>
    </>
  )
}

export default Anecdotes