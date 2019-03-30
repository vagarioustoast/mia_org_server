const mongoose = require("mongoose");
Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true, select: false },
  description: String,
  avatarUrl: String,
  annotations: {
    type: Schema.Types.ObjectId,
    ref: "Annotation"
  },
  isAdmin: Boolean
});

UserSchema.set("toJSON", {
  transform: function(doc, ret, opt) {
    delete ret["password"];
    return ret;
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
