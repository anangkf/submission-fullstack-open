/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// eslint-disable-next-line consistent-return
const registerUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!password) {
      return res.status(400).send({ error: 'password is required' });
    }
    if (password.length < 3) {
      return res.status(400).send({ error: 'minimum length of password is 3' });
    }

    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({ username, name, passwordHash });
    const data = await user.save();
    res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, getAllUsers };
