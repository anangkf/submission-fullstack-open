import React from 'react'

const Total = ({parts}) => {
  const totalExercises = parts.map(part => part.exercises)
    .reduce((acc, curr) => {
      // console.log('what is happening', acc, curr)
      return acc + curr
    }, 0)

  return (
    <p>
      <strong>Total of {totalExercises} exercises</strong>
    </p>
  )
}

export default Total