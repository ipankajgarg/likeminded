const mongoose = require("mongoose");

const { Schema } = mongoose;

const userCrush = new Schema({
  _userId: Schema.Types.ObjectId,
  _crushId: Schema.Types.ObjectId
});

const model = mongoose.model("crushs", userCrush);

module.exports = model;
