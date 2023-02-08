import React from 'react'

const Persons = ({dataToBeShown}) => {
  return (
    <ul>
        {dataToBeShown.map(({name, number}, idx) => {
          return(
            <li key={idx}>{name} | {number} </li>
          )
        })}
      </ul>
  )
}

export default Persons