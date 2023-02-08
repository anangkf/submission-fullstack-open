import React from 'react'

const Part = ({content}) => {
  const { name, exercises } = content;
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

export default Part