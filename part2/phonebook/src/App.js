import { useEffect, useState } from 'react'
import FilterBox from './components/FilterBox';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import noteServices from './services/note';

const INIT_NEW_PERSON = {
  name: '',
  number: ''
};

const INIT_NOTIF = {
  type: '',
  message: ''
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState(INIT_NEW_PERSON)
  const [notif, setNotif] = useState(INIT_NOTIF)

  const Notif = {
    info: (message) => {
      setNotif({
        type: '',
        message
      })
      setTimeout(() => setNotif(INIT_NOTIF), 2500)
    },
    success: (message) => {
      setNotif({
        type: 'success',
        message
      })
      setTimeout(() => setNotif(INIT_NOTIF), 2500)
    },
    error: (message) => {
      setNotif({
        type: 'error',
        message
      })
      setTimeout(() => setNotif(INIT_NOTIF), 2500)
    },
  }

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
      const {id} = persons.find(person => person.name === newPerson.name);
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
            Notif.success(`${newPerson.name} updated successfully`);
          })
          .catch(err => Notif.error(err.response.data.error))
        }
      }else{
      noteServices.create(newPerson)
        .then(data => {
          setPersons([...persons, data]);
          setNewPerson(INIT_NEW_PERSON);
          Notif.success(`Added ${newPerson.name}`);
        })
        .catch(err => Notif.error(err.response.data.error))
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
        Notif.success(`${name} was deleted successfully!`);
      })
      .catch(err => {
        if(err.response.status === 404) {
          Notif.error( `Information of ${name} has already been removed from server`);
        }
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
      .catch(err => console.log({err}))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notif.type} message={notif.message} />
      <FilterBox keyword={keyword} handleFilter={handleFilter} />
      
      <h2>add a new</h2>
      <PersonForm newPerson={newPerson} handleChange={handleChange} addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons dataToBeShown={dataToBeShown} deletePerson={deletePerson}/>
    </div>
  )
}

export default App