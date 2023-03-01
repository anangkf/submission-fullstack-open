const Blog = require('../models/Blog');
const User = require('../models/User');

const resetDB = async (req, res, next) => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { resetDB };
