import React from 'react'
import { useState } from 'react';

const Country = ({data, showDetails}) => {
  const [toggleDetails, setToggleDetails] = useState(showDetails);
  const {name, capital, area, languages, flags, latlng} = data;

  let langs = []
  for(let lang in languages) {
    langs.push(languages[lang]);
  }

  const handleShowDetails = () => {
    setToggleDetails(!showDetails)
  }

  if(toggleDetails) {
    return (
      <div>
        <h1>{name.common}</h1>
        <p>Capital {capital.join(', ')}</p>
        <p>Area {area}</p>

        <p>
          <strong>Languages:</strong>
        </p>
        <ul>
          {langs.map((lang, idx) => {
            return (
              <li key={idx}>{lang}</li>
            )
          })}
        </ul>

        <img 
          src={flags.png} 
          alt={flags.alt} 
          width={'160rem'} 
          style={{
            boxShadow: '-1.5px 1.5px 10px -2px #555'
          }}
        />
      </div>
    )
  }
  
  return (
    <p key={latlng.join('')}>{data.name.common}{' '}
      <button onClick={handleShowDetails}>show</button>
    </p>
  )
}

export default Country;