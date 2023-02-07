import React from 'react'

const Total = ({parts}) => {
  const totalExercises = parts.map(part => part.exercises)
    .reduce((acc, curr) => acc + curr, 0)

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

export default Total