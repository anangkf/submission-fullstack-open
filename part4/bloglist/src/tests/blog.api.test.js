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
}, 50000);

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

describe('post /api/blogs', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });

  test('after successfully adding 1 blog, it should return results with increased length by 1', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.results.map((blog) => blog.title);

    expect(titles).toContain(helper.exampleBlog.title);
    expect(response.body.results).toHaveLength(helper.initialBlogs.length);
  });

  test('invalid blog data should not added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.invalidBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property returned in response should named id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body.results.at(0);

    expect(blog.id).toBeDefined();
  });

  test('if the likes property is missing from the request, it should default to the value 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.exampleBlogWithoutLikes)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test('if the title or url properties are missing from the request data, it should responds with the status code 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.invalidBlog)
      .expect(400);

    const noteAtEnd = await helper.blogsInDB();
    expect(noteAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('delete api/blogs/:id', () => {
  test('should return status code 200 if given id is valid and exist', async () => {
    const id = await helper.validExistingID();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('should return status code 404 if given id is valid but not exist', async () => {
    const id = await helper.nonExistingID();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('should return status code 400 if given id is invalid', async () => {
    const id = '63f476a0d8c080a9de0';

    await api
      .delete(`/api/blogs/${id}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('put /api/blogs/:id', () => {
  test('should return status code 200 if given id is valid and exist, then returned likes should be correct', async () => {
    const { _id } = await Blog.findOne();
    _id.toString();

    const editedBlog = await api
      .put(`/api/blogs/${_id}`)
      .send({ likes: 5 })
      .expect(200);

    expect(editedBlog.body.data.likes).toBe(5);
  });

  test('should return status code 400 if given id is valid but request body invalid', async () => {
    const { _id } = await Blog.findOne();
    _id.toString();

    await api
      .put(`/api/blogs/${_id}`)
      .expect(400);
  });

  test('should return status code 404 if given id is valid but not exist', async () => {
    const id = await helper.nonExistingID();

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: 5 })
      .expect(404);
  });

  test('should return status code 400 if given id is invalid', async () => {
    const id = '63f476a0d8c080a9de0';

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: 5 })
      .expect(400);
  });
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});
