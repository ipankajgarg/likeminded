const User = require("../models/userAuthModel");

function userAuth(email, name) {
  //  return User.create({ email, name }).then(function(){

  // return {token:"Pankaj here you go!"}

  //  }).catch(function(err){
  // return new Error(err)
  //  })

  return User.findOne({ email })
    .then(function(users) {

console.log(users)

      if (users !== null) {
        return { token: "pankaj here you go" };
      }
      return users;
    })
    .catch(function() {
      return new Error({ message: "some internal server error" });
    });
}

module.exports = userAuth;
