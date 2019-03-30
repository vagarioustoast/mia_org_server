const mongoose = require("mongoose");
Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lifeSpan: String,
  biography: String,
  authorPicUrl: String
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
