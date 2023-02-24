// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');

const getAllBlogs = async (req, res, next) => {
  try {
    const resp = await Blog.find()
      .populate('user', { username: 1, name: 1 });

    res.json({ count: resp.length, results: resp });
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const createBlog = async (req, res, next) => {
  try {
    const { token, user } = req;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).send({ error: 'invalid token' });
    }
    const blog = new Blog({ ...req.body, user: decodedToken.id });

    const savedBlog = await blog.save();
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    res.status(201).json({ data: savedBlog });
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const deleteBlogByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token, user } = req;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const blog = await Blog.findById(id);
    const isUserMatch = blog?.user.toString() === decodedToken.id.toString();

    if (!blog) {
      return res.status(404).send({ message: `Blog with id ${id} was not found` });
    }
    if (!isUserMatch) {
      return res.status(401).send({ error: 'invalid token' });
    }

    const data = await blog.remove();
    if (data) {
      // eslint-disable-next-line no-underscore-dangle
      user.blogs = user.blogs.filter((blogId) => blogId.toString() !== data._id.toString());
      await user.save();
      res.status(200).send({ message: 'Blog deleted sucessfully', data });
    }
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const updateBlogByID = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;

    if (Object.keys(body).length === 0) {
      return res.status(400).send({ message: 'Bad Request' });
    }

    const data = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });

    if (data) {
      // eslint-disable-next-line no-underscore-dangle
      res.send({ message: 'Blog updated succesfully', data });
    } else {
      res.status(404).send({ error: `Blog with id ${id} was not found` });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBlogs, createBlog, deleteBlogByID, updateBlogByID,
};
