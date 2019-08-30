const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    validate: [validateEmail, "Please try a valid email address"]
  },
  name: { type: String, required: true },
  gender:{type:String,required:true},
  mobileNumber:{type:Number,required:true},
  profileImage:{type:String}
});

const Model = mongoose.model("users", user);

module.exports = Model;
