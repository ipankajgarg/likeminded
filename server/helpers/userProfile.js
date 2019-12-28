const User = require("../models/userAuthModel");
const Crush = require("../models/userCrushModel");

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

  myProfile: function(id) {
    const userPromise = User.findById({ _id: id });
    const crushPromise = Crush.find({ _userId: id });

    //const promise = new Promise(function(resolve, reject) {});

    return Promise.all([userPromise, crushPromise])
      .then(function(data) {
        console.log("data", data);
        //return { about: "fx" };
        var ids;
        var obj = data[0];
        if (data[1]) {
          ids = data[1].map(user => user._crushId);

          return User.find({ _id: { $in: ids } }).then(function(res) {
            console.log("0", data[0]);
            console.log("return data", { ...data[0], crushes: res });
            console.log("0", data[0]);
            return { ...obj, crushes: res };
          });
        }
      })
      .catch(err => console.log(err));

    return promise;
  },
  addCrush: function(_userId, _crushId) {
    return new Crush({ _userId, _crushId }).save().then(function(user) {
      console.log(user);
      return { message: "created", statusCode: 200 };
    });
  }
};

module.exports = userProfile;
