const Blog = require('../models/Blog');

const getAllPosts = async (req, res, next) => {
  try {
    const resp = await Blog.find();

    if (resp) {
      res.json({ count: resp.length, results: resp });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
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
