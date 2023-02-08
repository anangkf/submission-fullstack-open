import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  
  return (
    <>
      {parts.map(( part)=> {
        return(
          <Part key={part.id} content={part}/>
        )}
      )}
    </>
  )
}

export default Content