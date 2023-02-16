/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (val) => /^\d{2,3}-{1,}?\d{5,}$/gm.test(val),
      message: () => 'number invalid',
    },
  },
});

const Person = mongoose.model('Person', personSchema);

/**
 * transform returned object's _id property to id
 * delete property _id and __v of returned objects
 */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Person;
