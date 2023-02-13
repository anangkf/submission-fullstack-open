const express = require('express');
const {
  getAllPerson, getInfo, getPersonById, deletePersonById, addPerson,
} = require('./handler/personHandler');

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/persons', getAllPerson);
app.get('/api/info', getInfo);
app.get('/api/persons/:id', getPersonById);
app.delete('/api/persons/:id', deletePersonById);
app.post('/api/persons', addPerson);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
