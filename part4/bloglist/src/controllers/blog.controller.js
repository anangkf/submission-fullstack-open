const Blog = require('../models/Blog');
const User = require('../models/User');

const getAllPosts = async (req, res, next) => {
  try {
    const resp = await Blog.find()
      .populate('user', { username: 1, name: 1 });

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
    const user = await User.findById(blog.user);
    const savedBlog = await blog.save();
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();

    res.status(201).json({ data: savedBlog });
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
  getAllPosts, createBlog, deleteBlogByID, updateBlogByID,
};
