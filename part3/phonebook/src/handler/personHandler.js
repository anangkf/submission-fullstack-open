const persons = require('../mock/persons');
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

const getPersonById = (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
};

const deletePersonById = (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then((data) => {
      if (data) {
        res.json({ message: 'Person was deleted successfully', data });
      }
      res.status(404).send({ message: `person with id ${id} was not found` });
    })
    .catch((err) => next(err));
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
