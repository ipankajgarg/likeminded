//const graphql = require('graphql')
const graphql = require("graphql");
const userAuth = require("../helpers/userAuth");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql;
const GraphQLLong = require('graphql-type-long')

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

const Success = new GraphQLObjectType({
  name: "UserToken",
  fields: {
    message: { type: GraphQLString }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
