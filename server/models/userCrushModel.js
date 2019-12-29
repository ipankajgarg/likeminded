const mongoose = require("mongoose");

const { Schema } = mongoose;

const userCrush = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true },
  _crushId: { type: Schema.Types.ObjectId, required: true },
  message: String,
  likeminded: { type: Boolean, default: false }
});

const model = mongoose.model("crushes", userCrush);

module.exports = model;
