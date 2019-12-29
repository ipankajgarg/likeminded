const User = require("../models/userAuthModel");
const Crush = require("../models/userCrushModel");

const userLike = {
  getProfiles: function(id) {
    return Crush.find({ _crushId: id }).then(function(doc) {
      var userIds = [];
      //   console.log("doc", doc, err);

      if (doc.length) {
        userIds = doc.map(function(data) {
          return data._userId;
        });
        console.log("userIds", userIds);

        return User.find({ _id: { $in: userIds } });
      }
      return [];
    });
  }
};

module.exports = userLike;
