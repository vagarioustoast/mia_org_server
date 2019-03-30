const mongoose = require("mongoose");
Schema = mongoose.Schema;

const AnnotationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Annotation = mongoose.model("Author", AnnotationSchema);

module.exports = Annotation;
