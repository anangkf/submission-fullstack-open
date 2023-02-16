/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
// configure dotenv
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {
  getAllPerson, getInfo, getPersonById, deletePersonById, addPerson, updatePersonById,
} = require('./handler/personHandler');
const { unknownEndpoint, errorHandler } = require('./middleware/errorHandler');

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// create ui build
app.use(express.static('build'));

// configure database
require('./database/mongodb');

// creating new token for request body
morgan.token('body-request', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body-request'));

const PORT = process.env.PORT;

app.get('/api/persons', getAllPerson);
app.get('/api/info', getInfo);
app.get('/api/persons/:id', getPersonById);
app.delete('/api/persons/:id', deletePersonById);
app.post('/api/persons', addPerson);
app.put('/api/persons/:id', updatePersonById);

// send back a 404 error for any unknown endpoint request
app.use(unknownEndpoint);

// error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
