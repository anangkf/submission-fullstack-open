/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// eslint-disable-next-line consistent-return
const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send({ error: 'username or password missing' });
    }

    const user = await User.findOne({ username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).send({ error: 'invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' });
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find()
      .populate('blogs', { user: 0 });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, getAllUsers, userLogin };
