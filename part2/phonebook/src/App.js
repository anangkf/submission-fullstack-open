import { useEffect, useState } from 'react'
import FilterBox from './components/FilterBox';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import noteServices from './services/note';

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
    const newID = persons.at(-1).id + 1;
    
    if(isPersonExist){
      const {id} = persons.filter(person => person.name === newPerson.name).at(0);
      if(
        window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
        ) {
          noteServices.update({...newPerson, id})
          .then((data) => {
            const newData = persons.map(person => {
              if(person.id === id){
                return data;
              }
              return person;
            })
            setPersons(newData);
            setNewPerson(INIT_NEW_PERSON);
          })
        }
      }else{
      const newData = {...newPerson, id: newID}
      noteServices.create(newData)
        .then(data => {
          setPersons([...persons, data]);
          setNewPerson(INIT_NEW_PERSON);
        })
    }
  }

  const [keyword, setKeyword] = useState('');

  const handleFilter = (e) => {
    setKeyword(e.target.value.toLowerCase());
  }

  const deletePerson = (person) => {
    const {name, id} = person;
    if(window.confirm(`Delete ${name}?`)) {
      noteServices.delete(person.id)
      .then(() => {
        const newData = persons.filter(person => person.id !== id);
        setPersons(newData);
        alert(`${name} was deleted successfully!`)
      })
    }
  }

  const dataToBeShown = keyword 
    ? persons.filter(({name}) => name.toLowerCase().includes(keyword))
    : persons;

  useEffect(() => {
    noteServices.getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterBox keyword={keyword} handleFilter={handleFilter} />
      
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} handleChange={handleChange} addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons dataToBeShown={dataToBeShown} deletePerson={deletePerson}/>
    </div>
  )
}

export default App