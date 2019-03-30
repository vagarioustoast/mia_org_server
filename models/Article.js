const mongoose = require("mongoose");
Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  author: {
    type: Schema.Type.ObjectId,
    ref: "Author"
  },
  pubDate: String,
  content: String,
  source: {
    type: String,
    required: true
  },
  category: String
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
