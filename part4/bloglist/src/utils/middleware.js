const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: err.message });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  if (req.method !== 'GET') {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '');
    }
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.method !== 'GET') {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
