/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err.message));
