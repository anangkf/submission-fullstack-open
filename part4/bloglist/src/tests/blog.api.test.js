/* eslint-disable import/no-extraneous-dependencies */
const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const helper = require('./test_helper');

const api = supertest(app);

// configure state in database before running tests
beforeEach(async () => {
  await Blog.deleteMany();

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe('/api/blogs', () => {
  test('should returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('should return all blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.results).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.results.map((blog) => blog.title);
    expect(titles).toContain('My Third Blog');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
