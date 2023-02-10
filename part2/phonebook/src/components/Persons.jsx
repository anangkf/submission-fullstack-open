import React from 'react'

const Persons = ({dataToBeShown, deletePerson}) => {
  return (
    <ul>
        {dataToBeShown.map((person) => {
          const {name, number, id} = person;
          return(
            <div key={id}>
              <li>{name} | {number} </li>
              <button onClick={() => deletePerson(person)}>delete</button>
            </div>
          )
        })}
      </ul>
  )
}

export default Persons