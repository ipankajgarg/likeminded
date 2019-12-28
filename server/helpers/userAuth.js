const User = require("../models/userAuthModel");
const { errorName } = require("../constants/errors");

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
  },

  editProfile: function({ coverImage, profileImage, id, about }) {
    return User.findByIdAndUpdate(
      { _id: id },
      { coverImage, profileImage, about },
      { new: true },
      function(err, doc) {
        if (err) {
          return new Error(errorName.SERVER_ERROR);
        }
        console.log(doc);
        return doc;
      }
    );
  }
};

module.exports = userAuth;
