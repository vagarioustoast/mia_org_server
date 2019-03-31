const db = require("../models");
// Grabs "Author" from Models
const Author = db.Author;

module.exports = {
  // Finds All Authors
  index: (req, res) => {
    Author.find({}, (err, foundAuthors) => {
      if (err) return console.error(err);
      res.json(foundAuthors);
    });
  },
  // Finds a single Author
  showOne: (req, res) => {
    Author.find({ _id: req.params.id }, (err, foundAuthor) => {
      res.json(foundAuthor);
    });
  }
};
