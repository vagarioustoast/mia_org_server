const db = require("../models");
// Grabs "Annotation" from models
const Annotation = db.Annotation;

module.exports = {
  // Show All Annotations
  index: (req, res) => {
    Annotation.find({}, (err, foundAnnotations) => {
      if (err) return console.error(err);
      res.json(foundAnnotations);
    });
  },
  // Show Annotations for Single Article
  showArticleAnnotations: (req, res) => {
    Annotation.find({ article: req.params.id })
      .populate("user")
      .exec((err, articleAnnotations) => {
        if (err) return console.error(err);
        res.json(articleAnnotations);
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
