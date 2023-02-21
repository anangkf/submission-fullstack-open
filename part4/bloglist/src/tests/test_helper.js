const Blog = require('../models/Blog');

const exampleBlog = {
  title: 'My Third Blog',
  author: 'Zack',
  url: 'https://bestblogs.com/blog/j8hjqw-auq812-jahsaq',
  likes: 2,
};

const exampleBlogWithoutLikes = {
  title: 'My Third Blog',
  author: 'Zack',
  url: 'https://bestblogs.com/blog/j8hjqw-auq812-jahsaq',
};

const invalidBlog = {
  author: 'Zack',
  likes: 2,
};

const initialBlogs = [
  {
    title: 'My First Blog',
    author: 'Jack',
    url: 'https://bestblogs.com/blog/j8hjqw-auq812-jahsaq',
    likes: 3,
  },
  {
    title: 'My Third Blog',
    author: 'Zack',
    url: 'https://bestblogs.com/blog/j8hjqw-auq812-jahsaq',
    likes: 2,
  },
];

const nonExistingID = async () => {
  const blog = new Blog({
    title: 'My Third Blog',
    author: 'Zack',
    url: 'https://bestblogs.com/blog/j8hjqw-auq812-jahsaq',
    likes: 2,
  });
  await blog.save();
  await blog.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find();
  return blogs.body.results.map((blog) => blog.toJSON());
};

module.exports = {
  exampleBlog, exampleBlogWithoutLikes, invalidBlog, initialBlogs, nonExistingID, blogsInDB,
};
