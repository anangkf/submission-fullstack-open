import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  
  return (
    <>
      {parts.map(( part, idx )=> {
        return(
          <Part key={idx} content={part}/>
        )}
      )}
    </>
  )
}

export default Content