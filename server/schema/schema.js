//const graphql = require('graphql')
const graphql = require("graphql");
const userAuth = require("../helpers/userAuth");
const userProfile = require("../helpers/userProfile");
const userCrush = require("../helpers/userCrush");
const userLike = require("../helpers/userLike");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLList
} = graphql;
const GraphQLLong = require("graphql-type-long");

const CircleType = new GraphQLObjectType({
  name: "circle",
  fields: {
    name: { type: GraphQLString }
  }
});

const DemoType = new GraphQLObjectType({
  name: "Demo",
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLString },

    hidden: {
      type: CircleType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }, context) {
        return { name };
      }
    }
  }
});

const PositionType = new GraphQLInputObjectType({
  name: "position",
  fields: {
    lat: { type: GraphQLLong },
    lng: { type: GraphQLLong }
  }
});

const LocationType = new GraphQLInputObjectType({
  name: "location",
  fields: {
    country: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    formattedAddress: { type: GraphQLString },
    locality: { type: GraphQLString },
    streetName: { type: GraphQLString },
    position: { type: PositionType }
  }
});

var UserType = new GraphQLObjectType({
  name: "userType",
  fields: () => ({
    id: { type: GraphQLID },
    about: { type: GraphQLString },
    coverImage: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    count: { type: GraphQLInt },
    mobileNumber: { type: GraphQLLong },
    crushes: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        console.log("parentValue", parentValue);
        return userCrush.getProfiles(parentValue.id);
      }
    },
    likes: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return userLike.getProfiles(parentValue.id);
      }
    }
  })
});

const Success = new GraphQLObjectType({
  name: "UserToken",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    demo: {
      type: DemoType,
      resolve(parentValue, args, context) {
        console.log("incoming request");
        return { name: "pankaj" };
      }
    },
    newDemo: {
      type: DemoType,
      resolve(parentValue, args, context) {
        return new Promise((resolve, reject) => {
          setTimeout(function() {
            resolve({ name: "graphql" });
          }, 2000);
        });
      }
    },
    getProfile: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }, req) {
        return userProfile.getProfile(id);
      }
    },
    mostLiked: {
      type: UserType,
      resolve() {
        return userProfile.mostLiked();
      }
    },
    PaginatedProfiles: {
      type: new GraphQLList(UserType),
      args: {
        pageSize: { type: GraphQLInt },
        pageNo: { type: GraphQLInt }
      },
      resolve(parentValue, { pageNo, pageSize }) {
        return userProfile.getPaginatedProfiles(pageNo, pageSize);
      }
    },
    searchedProfiles: {
      type: new GraphQLList(UserType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name }) {
        return userProfile.getSearchedProfiles(name);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    isSignedIn: {
      type: Success,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, name }, context) {
        return userAuth.isSignedIn(email, name);
      }
    },
    isMobileNumberExist: {
      type: Success,
      args: {
        mobileNumber: { type: new GraphQLNonNull(GraphQLLong) }
      },
      resolve(parentValue, { mobileNumber }, req) {
        return userAuth.isMobileNumberExist(mobileNumber);
      }
    },
    signUp: {
      type: Success,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        mobileNumber: { type: new GraphQLNonNull(GraphQLLong) }
        // location: { type: LocationType }
      },
      resolve(parentValue, { email, mobileNumber, name }, req) {
        console.log("signed up", email, mobileNumber, name);

        return userAuth.signUp({ email, mobileNumber, name });
      }
    },
    editProfile: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        coverImage: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        about: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return userProfile.editProfile(args);
      }
    },
    addCrush: {
      type: Success,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        crushId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id, crushId }) {
        return userCrush.add(id, crushId);
      }
    },
    updateCoverImage: {
      type: Success,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id, image }) {
        return userProfile.updateCoverImage(id, image);
      }
    },
    updateProfileImage: {
      type: Success,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id, image }) {
        return userProfile.updateProfileImage(id, image);
      }
    },
    updateAboutMe: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        about: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id, about }) {
        return userProfile.updateAboutMe(id, about);
      }
    },
    uploadImageForAll: {
      type: Success,
      args: {
        imageURL: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { imageURL }) {
        return userProfile.uploadImageForAll(imageURL);
      }
    },
    updateAboutMeForAll: {
      type: Success,
      args: {
        about: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { about }) {
        return userProfile.updateAboutMeForAll(about);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
