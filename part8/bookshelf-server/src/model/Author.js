const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const auhtorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

auhtorSchema.plugin(uniqueValidator)

const Author = mongoose.model('Author', auhtorSchema);

module.exports = Author;