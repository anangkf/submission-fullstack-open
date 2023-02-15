/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

const [, , mongoPassword, name, number] = process.argv;
if (process.argv.length < 3) {
  throw new Error('Please insert your mongo password, name and number!');
}

const MONGODB_URI = `mongodb+srv://mongo_anangkf:${mongoPassword}@cluster0.mv3gtsa.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook:');
      // eslint-disable-next-line no-shadow
      persons.map(({ name, number }) => console.log(`${name} ${number}`));
      mongoose.connection.close();
    });
} else {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
