const mongoose = require("mongoose");
Schema = mongoose.Schema;

const AnnotationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Annotation = mongoose.model("Annotation", AnnotationSchema);

module.exports = Annotation;
