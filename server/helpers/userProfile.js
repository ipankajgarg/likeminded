const User = require("../models/userAuthModel");
const { errorName } = require("../constants/errors");

const userProfile = {
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
  },

  mostLiked: function() {
    return User.find()
      .sort({ count: -1 })
      .then(function(doc) {
        return doc[0];
      });
  },

  getProfile: function(id) {
    return User.findById({ _id: id });
  },
  getPaginatedProfiles: function(pageNo, pageSize) {
    return User.find()
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize);
  },
  getSearchedProfiles: function(name) {
    return User.find({ name: { $regex: `.*${name}*.` } });
  },

  getProfileImages: function() {
    return User.find({}, { profileImage: 1, _id: 1 });
  },

  updateCoverImage: function(id, coverImage) {
    return User.findOneAndUpdate({ _id: id }, { coverImage })
      .then(function() {
        return { message: "updated cover image", statusCode: 200 };
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  },
  updateProfileImage: function(id, profileImage) {
    return User.findOneAndUpdate({ _id: id }, { profileImage })
      .then(function() {
        return { message: "updated profile image", statusCode: 200 };
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  },
  updateAboutMe: function(id, about) {
    return User.findOneAndUpdate({ _id: id }, { about }, { new: true })
      .then(function(user) {
        return user;
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  },
  uploadImageForAll: function(profileImage) {
    return User.update({}, { profileImage }, { new: true, multi: true })
      .then(function(result) {
        console.log(result);
        return {
          message: `updated ${result.nModified} from ${result.n}`,
          statusCode: 201
        };
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  },
  updateAboutMeForAll: function(about) {
    return User.update({}, { about }, { multi: true })
      .then(function(result) {
        console.log(result);
        return {
          message: `updated ${result.nModified} from ${result.n}`,
          statusCode: 201
        };
      })
      .catch(function(err) {
        return new Error(errorName.SERVER_ERROR);
      });
  }
};

module.exports = userProfile;
