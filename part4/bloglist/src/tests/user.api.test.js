const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');
const helper = require('./user_test_helper');

const api = supertest(app);

// configure users state in database before running tests
beforeEach(async () => {
  await User.deleteMany();

  const usersObject = helper.initialUsers.map((user) => new User(user));
  const promiseArray = usersObject.map((user) => user.save());

  await Promise.all(promiseArray);
});

describe('/api/users', () => {
  test('should returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('should return all users', async () => {
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test('a specific blog is within the returned users', async () => {
    const response = await api.get('/api/users');

    const names = response.body.map((user) => user.name);
    expect(names).toContain('Peter Drury');
  });
});

describe('user register', () => {
  test('a valid user should be added', async () => {
    await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(201);

    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length + 1);
  });

  test('if username is missing, it should return propper status code and error message', async () => {
    const resp = await api
      .post('/api/users')
      .send(helper.userWithoutUsername)
      .expect(400);

    expect(resp.body.error).toBe('User validation failed: username: username is required');
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length);
  });

  test('if username is less than 3 chars, it should return propper status code and error message', async () => {
    const resp = await api
      .post('/api/users')
      .send(helper.userWithInvalidUsername)
      .expect(400);

    expect(resp.body.error).toBe('User validation failed: username: minimum length of username is 3');
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length);
  });

  test('if password is missing, it should return propper status code and error message', async () => {
    const resp = await api
      .post('/api/users')
      .send(helper.userWithoutPassword)
      .expect(400);

    expect(resp.body.error).toBe('password is required');
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length);
  });

  test('if password is less than 3 chars, it should return propper status code and error message', async () => {
    const resp = await api
      .post('/api/users')
      .send(helper.userWithInvalidPassword)
      .expect(400);

    expect(resp.body.error).toBe('minimum length of password is 3');
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length);
  });

  test('if name is missing, it should return propper status code and error message', async () => {
    const resp = await api
      .post('/api/users')
      .send(helper.userWithoutName)
      .expect(400);

    expect(resp.body.error).toBe('User validation failed: name: name is required, username: username must unique');
    const users = await helper.usersInDB();
    expect(users).toHaveLength(helper.initialUsers.length);
  });
});

/**
 * TODO: test /api/users/login
 * TODO: if username is missing it should return propper status code and error message
 * TODO: if password is missing it should return propper status code and error message
 * TODO: if username or password doesnt match it should return propper status code and error message
 * TODO: if credentials are valid it should return token, username and name
 */

afterAll(async () => {
  await mongoose.connection.close();
});
