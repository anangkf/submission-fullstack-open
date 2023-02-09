import { useEffect, useState } from 'react'
import axios from 'axios'
import FilterBox from './components/FilterBox';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const INIT_NEW_PERSON = {
  name: '',
  number: ''
};

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState(INIT_NEW_PERSON)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({
      ...newPerson,
      [name]: value
    });
  }

  const addPerson = (e) => {
    e.preventDefault();
    const isPersonExist = persons.filter(({name}) => name.toLowerCase() === newPerson.name.toLowerCase())
      .length > 0;

    if(isPersonExist){
      alert(`${newPerson} is already added to phonebook`);
    }else{
      setPersons([...persons, newPerson]);
      setNewPerson(INIT_NEW_PERSON);
    }
  }

  const [keyword, setKeyword] = useState('');

  const handleFilter = (e) => {
    setKeyword(e.target.value.toLowerCase());
  }

  const dataToBeShown = keyword 
    ? persons.filter(({name}) => name.toLowerCase().includes(keyword))
    : persons;

  useEffect(() => {
    axios.get(`http://localhost:3001/persons`)
      .then(res => {
        setPersons(res.data)
      })
      .catch(err => console.log({err}));
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterBox keyword={keyword} handleFilter={handleFilter} />
      
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} handleChange={handleChange} addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons dataToBeShown={dataToBeShown} />
    </div>
  )
}

export default App