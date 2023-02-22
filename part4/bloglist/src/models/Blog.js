/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  // author: {
  //   type: String,
  //   required: true,
  // },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Blog = mongoose.model('Blog', blogSchema);

/**
 * transform returned object's _id property to id
 * delete property _id and __v of returned objects
 */
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Blog;
