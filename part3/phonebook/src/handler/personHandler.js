let persons = require('../mock/persons');
const Person = require('../model/Person');

const getAllPerson = (req, res) => {
  Person.find({})
    .then((people) => {
      res.json(people);
    });
};

const getInfo = (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p> ${date}`);
};

const getPersonById = (req, res) => {
  const { id } = req.params;
  Person.findById(id)
    .then((data) => res.json(data))
    .catch(() => res.status(404).end());
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
  const newPerson = new Person({ name, number });

  if (name && number) {
    newPerson
      .save()
      .then((data) => {
        res.status(201).json(data);
      });
  } else {
    res.status(400).end();
  }
};

module.exports = {
  getAllPerson, getInfo, getPersonById, deletePersonById, addPerson,
};
