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
  }
};
