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

const createBlog = async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    const data = await blog.save();
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const deleteBlogByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Blog.findByIdAndRemove(id);
    if (data) {
      res.status(200).send({ message: 'Blog deleted sucessfully', data });
    } else {
      res.status(404).send({ message: `Blog with id ${id} was not found` });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts, createBlog, deleteBlogByID,
};
