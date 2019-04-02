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
  // Finds a Single Author
  showOne: (req, res) => {
    Author.find({ _id: req.params.id }, (err, foundAuthor) => {
      res.json(foundAuthor);
    });
  },
  // Creates an Author
  createAuthor: (req, res) => {
    let newAuthor = new Author({
      name: req.body.name,
      lifeSpan: req.body.lifeSpan,
      biography: req.body.biography,
      authorPicUrl: req.body.authorPicUrl
    });
    Author.create(newAuthor, (err, createdAuthor) => {
      if (err) console.error(err);
      res.json(createdAuthor);
    });
  }
};
