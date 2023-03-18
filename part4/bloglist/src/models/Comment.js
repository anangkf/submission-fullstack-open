/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const { Schema, default: mongoose } = require('mongoose');

const commentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

/**
 * transform returned object's _id property to id
 * delete property _id and __v of returned objects
 */
commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Comment;
