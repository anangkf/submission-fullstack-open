import React from 'react'
import Part from './Part'

const Content = ({contents}) => {
  const { 
    part1, part2, part3, exercises1, exercises2, exercises3 
  } = contents;

  return (
    <>
      <Part part={part1} content={exercises1}/>
      <Part part={part2} content={exercises2}/>
      <Part part={part3} content={exercises3}/>
    </>
  )
}

export default Content