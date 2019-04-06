const db = require("../models");
// Grabs "Article" from models
const Article = db.Article;

module.exports = {
  // Shows All Articles
  index: (req, res) => {
    Article.find({})
      .populate("author")
      .exec((err, foundArticles) => {
        if (err) return console.error(err);
        res.json(foundArticles);
      });
  },
  showCategory: (req, res) => {
    Article.find({ category: req.params.category })
      .populate("author")
      .exec((err, foundCategory) => {
        if (err) console.error(err);
        res.json(foundCategory);
      });
  },
  // Shows a Single Article
  showOneArticle: (req, res) => {
    Article.find({ _id: req.params.id }, (err, foundArticle) => {
      if (err) console.error(err);
      res.json(foundArticle);
    });
  },
  // Creates an Article
  createArticle: (req, res) => {
    Article.find({ title: req.body.title })
      .exec()
      .then(article => {
        if (article.length >= 1) {
          return res.status(409).json({
            message: "This article already exists."
          });
        } else {
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
        }
      });
  },
  // Updates an Article
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
  // Deletes an Article
  deleteArticle: (req, res) => {
    let articleId = req.body._id;
    Article.findOneAndDelete({ _id: articleId }, (err, foundArticle) => {
      if (err) return console.error(err);
      res.json(foundArticle);
    });
  }
};
