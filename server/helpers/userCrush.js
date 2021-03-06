const User = require("../models/userAuthModel");
const Crush = require("../models/userCrushModel");

const userCrush = {
  add: function(_userId, _crushId) {
    return new Crush({ _userId, _crushId }).save().then(function(user) {
      console.log(user);

      return User.findByIdAndUpdate(
        _crushId,
        { $inc: { count: 1 } },
        { new: true }
      ).then(function(doc) {
        return { message: "created", statusCode: 200 };
      });
    });
  },

  likeBack: function(_userId, _crushId) {
    console.log("function");
    return Crush.findOneAndUpdate(
      { _crushId: _userId, _userId: _crushId },
      { likeminded: true },
      { new: true }
    )
      .then(function(user) {
        console.log("user");
        return { message: "success", statusCode: 200 };
      })
      .catch(function(err) {
        console.log("err");
        new Error(errorName.SERVER_ERROR);
      });
  },

  getProfiles: function(id) {
    console.log("id", id);

    return Crush.find({ _userId: id }).then(function(doc) {
      var crushIds = [];
      //   console.log("doc", doc, err);

      if (doc.length) {
        crushIds = doc.map(function(data) {
          return data._crushId;
        });
        console.log("crushIds", crushIds);

        return User.find({ _id: { $in: crushIds } });
      }
      return [];
    });
  }
};

module.exports = userCrush;
