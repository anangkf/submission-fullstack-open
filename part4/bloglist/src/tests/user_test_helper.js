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

const validCredential = {
  username: 'johnDoe',
  password: 'johngantenk',
};

const invalidCredential = {
  username: 'fakeaccount',
  password: 'ngacobang',
};

const errorInvalidCredential = {
  error: 'invalid username or password',
};

const incompleteCredential = {
  username: 'johnDoe',
};

const errorIncompleteCredential = {
  error: 'username or password missing',
};

const errorMissingJwt = {
  error: 'jwt must be provided',
};

const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldGVyIiwiaWQiOiI2M2Y2MWNlOTQ2Yjc4MzBkOTAxMjc1MjgiLCJpYXQiOjE2NzcxMjM0OTEsImV4cCI6MTY3NzIwOTg5MX0.4orndEoETjkDBLtlrwviwMDKJSDebXXhrmowbeS9klY';

const errorTokenExpired = {
  error: 'token expired',
};

const invalidToken = 'thisIsInvalidJwtToken';

const errorInvalidToken = {
  error: 'jwt malformed',
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
  validCredential,
  invalidCredential,
  errorInvalidCredential,
  incompleteCredential,
  errorIncompleteCredential,
  errorMissingJwt,
  expiredToken,
  errorTokenExpired,
  invalidToken,
  errorInvalidToken,
};
