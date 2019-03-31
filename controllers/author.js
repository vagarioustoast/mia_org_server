const db = require("../models");
// Grabs "Author" from Models
const Author = db.Author;

module.exports = {
  index: (req, res) => {
    Author.find({}, (err, foundAuthors) => {
      if (err) return console.error(err);
      res.json(foundAuthors);
    });
  },

  showOne: (req, res) => {
    Author.find({ _id: req.params.id }, (err, foundAuthor) => {
      res.json(foundAuthor);
    });
  }
};
