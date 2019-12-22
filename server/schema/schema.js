//const graphql = require('graphql')
const graphql = require("graphql");
const userAuth = require("../helpers/userAuth");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
