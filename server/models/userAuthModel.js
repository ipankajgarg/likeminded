const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const locationSchema = require("../mongooseSchema/locationSchema");

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    validate: [validateEmail, "Please try a valid email address"]
  },
  name: { type: String },
  gender: { type: String },
  mobileNumber: { type: Number, required: true },
  profileImage: { type: String },
  location: { type: locationSchema },
  profileImage: { type: String },
  coverImage: { type: String },
  about: { type: String }
});

// TODO : name and gender should be required

const Model = mongoose.model("users", user);

module.exports = Model;
