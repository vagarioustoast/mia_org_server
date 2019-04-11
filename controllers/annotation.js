const db = require("../models");
// Grabs "Annotation" from models
const Annotation = db.Annotation;

module.exports = {
  // Show All Annotations
  index: (req, res) => {
    Annotation.find({})
      .populate("user")
      .populate("article")
      .exec((err, foundAnnotations) => {
        if (err) return console.error(err);
        res.json(foundAnnotations);
      });
  },
  // Show Annotations for Single Article
  showArticleAnnotations: (req, res) => {
    let articleId = req.params.articleid;
    Annotation.find({ article: articleId })
      .populate("user")
      .exec((err, articleAnnotations) => {
        if (err) return console.error(err);
        res.json(articleAnnotations);
      });
  },
  showUserAnnotations: (req, res) => {
    Annotation.find({ userid: req.params.id })
      .populate("article")
      .exec((err, UserAnnotations) => {
        if (err) console.error(err);
        res.json(UserAnnotations);
      });
  },
  //Creates Annotation
  create: (req, res) => {
    let newAnnotation = new Annotation({
      user: req.body.user,
      article: req.body.article,
      content: req.body.content
    });
    Annotation.create(newAnnotation, (err, createdAnnotation) => {
      if (err) console.error(err);
      res.json(createdAnnotation);
    });
  }
};
