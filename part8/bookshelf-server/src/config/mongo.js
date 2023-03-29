require('dotenv').config();
const mongoose = require('mongoose');

console.log('connecting to database')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('error connecting to db', err.message));

