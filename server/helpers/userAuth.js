const User = require("../models/userAuthModel");

const userAuth = {
  isSignedIn: function(email, name) {
    return User.findOne({ email })
      .then(function(user) {
        console.log(user);

        if (user) {
          return { message: "pankaj here you go" };
        }
        return user;
      })
      .catch(function(err) {
        console.log(err);
        return new Error("some internal server error please try later!");
      });
  },

  isMobileNumberExist: function(mobileNumber) {
    return User.findOne({ mobileNumber })
      .then(function(user) {
        if (user) {
          return new Error("user already exist with this number");
        }
        // return new Error("some internal server error please try later!");
        return { message: "pankaj here you go" };
      })
      .catch(function(err) {
        return new Error("some internal server error please try later!");
      });
  },

  signUp: function({ email, mobileNumber, location }) {
    const newUser = new User({ email, mobileNumber, location });

    return newUser.save().then(function(user) {
      return { message: "its done" };
    });
  }
};

module.exports = userAuth;
