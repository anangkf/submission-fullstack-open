import React from 'react'
import Country from './Country';

const Countries = ({data}) => {
  if(data.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if(data.length === 1) {
    const [country] = data;
    const { languages } = country;

    let langs = []
    for(let lang in languages) {
      langs.push(languages[lang]);
    }

    return (
      <Country data={country} showDetails={true}/>
    )
  }
  return (
    data.map(country => {
      const { latlng } = country;
      return (
        <Country key={latlng.join('')} data={country} />
      )
    })
  )
}

export default Countries;