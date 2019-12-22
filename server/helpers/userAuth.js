const User = require("../models/userAuthModel");
const { errorName } = require("../constants/errors");

class CustomError extends Error {
  code = 500;
  message = this.message || "This content is not available in your country";
}

const userAuth = {
  isSignedIn: function(email, name) {
    return User.findOne({ email })
      .then(function(user) {
        console.log(user);

        if (user) {
          return { statusCode: 200, message: "pankaj here you go" };
        }

        return new Error(errorName.NOT_FOUND);
      })
      .catch(function(err) {
        console.log("catch", err);
        return new Error(errorName.SERVER_ERROR);
      });
  },

  isMobileNumberExist: function(mobileNumber) {
    return User.findOne({ mobileNumber })
      .then(function(user) {
        if (user) {
          return new Error(errorName.BAD_REQUEST);
        }
        // return new Error("some internal server error please try later!");
        return { statusCode: 200, message: "pankaj here you go" };
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  },

  signUp: function({ email, mobileNumber, name }) {
    const newUser = new User({ email, mobileNumber, name });

    return newUser.save().then(function(user) {
      return { statusCode: 200, message: "its done" };
    });
  }
};

module.exports = userAuth;
