/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    minLength: [3, 'minimum length of username is 3'],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

const User = mongoose.model('User', userSchema);

// Apply the uniqueValidator plugin to userSchema.
// second parameter is custom error message
userSchema.plugin(uniqueValidator, { message: 'username must unique' });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = User;
