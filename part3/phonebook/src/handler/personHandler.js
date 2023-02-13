let persons = require('../mock/persons');

const getAllPerson = (req, res) => {
  res.json(persons);
};

const getInfo = (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p> ${date}`);
};

const getPersonById = (req, res) => {
  const { id } = req.params;
  const currentPerson = persons.find((person) => person.id === Number(id));

  if (currentPerson) {
    return res.json(currentPerson);
  }
  return res.status(404).end();
};

const deletePersonById = (req, res) => {
  const { id } = req.params;
  const deletedPerson = persons.find((person) => person.id === Number(id));
  if (deletedPerson) {
    persons = persons.filter((person) => person.id !== Number(id));
    res.json({ message: `Person with id ${id} has been deleted`, data: deletedPerson });
  } else {
    res.status(404).json({ status: 'error', message: `Person with id ${id} was not found` });
  }
};

const addPerson = (req, res) => {
  const { name, number } = req.body;
  const newID = Math.floor(Math.random() * 9999999999999);
  const personIsExist = persons.find((person) => person.name === name);

  if (!(name && number)) {
    res.status(400).json({ status: 'error', message: 'name or number is missing' });
    return;
  }

  if (personIsExist) {
    res.status(409).json({ status: 'error', message: 'name must be unique' });
  } else {
    persons.push({ id: newID, name, number });
    res.status(201).json({ id: newID, name, number });
  }
};

module.exports = {
  getAllPerson, getInfo, getPersonById, deletePersonById, addPerson,
};
