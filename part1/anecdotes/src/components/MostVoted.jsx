import React from 'react'

const MostVoted = ({data, mostVoted}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{data[mostVoted]}</p>
    </>
  )
}

export default MostVoted