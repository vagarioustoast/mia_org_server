const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mia_org");

module.exports = {
  User: require("./User"),
  Author: require("./Author"),
  Article: require("./Article"),
  Annotation: require("./Annotation")
};
