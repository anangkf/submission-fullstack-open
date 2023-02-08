import { useState } from 'react'
import FilterBox from './components/FilterBox';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const INIT_PERSON = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

const INIT_NEW_PERSON = {
  name: '',
  number: ''
};

const App = () => {
  const [persons, setPersons] = useState(INIT_PERSON) 
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