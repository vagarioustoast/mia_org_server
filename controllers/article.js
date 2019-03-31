const db = require("../models");
// Grabs "Article" from models
const Article = db.Article;

module.exports = {
  index: (req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (err) return console.error(err);
      res.json(foundArticles);
    });
  },
  showOne: (req, res) => {
    Article.find({ _id: req.params.id }, (err, foundArticle) => {
      res.json(foundArticle);
    });
  },
  createArticle: (req, res) => {
    let newArticle = new Article({
      title: req.body.title,
      author: req.body.author,
      pubDate: req.body.pubDate,
      content: req.body.content,
      source: req.body.source,
      category: req.body.category
    });
    Article.create(newArticle, (err, createdArticle) => {
      if (err) return console.error(err);
      res.json(createdArticle);
    });
  },
  updateArticle: (req, res) => {
    let articleId = req.body._id;
    Article.findOneAndUpdate(
      { _id: articleId },
      req.body,
      { new: true },
      (err, updatedArticle) => {
        if (err) return console.error(err);
        res.json(updatedArticle);
      }
    );
  },
  deleteArticle: (req, res) => {
    let articleId = req.body._id;
    Article.findOneAndDelete({ _id: articleId }, (err, foundArticle) => {
      if (err) return console.error(err);
      res.json(foundArticle);
    });
  }
};
