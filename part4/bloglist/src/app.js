const mongoose = require('mongoose');
const express = require('express');

const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogRouter = require('./routes/blogRoute');

mongoose.set('strictQuery', false);

logger.info('connecting to database');

// connect to db
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB', err.message);
  });

// enable cors
app.use(cors());

// parse request body to json
app.use(express.json());

// added request logger middleware
app.use(middleware.requestLogger);

// app routes
app.use('/api/blogs', blogRouter);

// added middleware for unknown endpoint and error handler
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
