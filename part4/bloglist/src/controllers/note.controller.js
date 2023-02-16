const Blog = require('../models/Blog');

const getAllPosts = (req, res) => {
  Blog.find()
    .then((blogs) => {
      if (blogs) {
        res.json({ count: blogs.length, results: blogs });
      } else {
        res.status(404).end();
      }
    });
};

const createBlog = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(400).send(err.message));
};

module.exports = {
  getAllPosts, createBlog,
};
