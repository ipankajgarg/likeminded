const mongoose = require("mongoose");

const { Schema } = mongoose;

const userLike = new Schema({
  _userId: Schema.Types.ObjectId,
  _likeId: Schema.Types.ObjectId
});

const model = mongoose.model("userLikes", userLike);

module.exports = model;
