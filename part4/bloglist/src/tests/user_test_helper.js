const User = require('../models/User');

const initialUsers = [
  {
    username: 'johnDoe',
    name: 'John Doe',
    password: 'johngantenk',
  },
  {
    username: 'peter11',
    name: 'Peter Drury',
    password: 'petergantenk',
  },
];

const userWithoutUsername = {
  name: 'Peter Drury',
  password: 'petergantenk',
};

const userWithoutPassword = {
  username: 'peter11',
  name: 'Peter Drury',
};

const userWithoutName = {
  username: 'peter11',
  password: 'petergantenk',
};

const userWithInvalidUsername = {
  username: 'pd',
  name: 'Peter Drury',
  password: 'petergantenk',
};

const userWithInvalidPassword = {
  username: 'peter11',
  name: 'Peter Drury',
  password: 'pd',
};

const validUser = {
  username: 'kasamoah',
  name: 'Kevin Asamoah',
  password: 'kevingantenk',
};

const usersInDB = async () => {
  const users = await User.find();
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  userWithoutUsername,
  userWithoutPassword,
  userWithoutName,
  userWithInvalidUsername,
  userWithInvalidPassword,
  validUser,
  usersInDB,
};
