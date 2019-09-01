//const graphql = require('graphql')
const graphql = require("graphql");
const userAuth = require("../helpers/userAuth");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

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

const UserToken = new GraphQLObjectType({
  name: "UserToken",
  fields: {
    token: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString }
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
    signIn: {
      type: UserToken,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, name }, context) {
        console.log("print", userAuth(email, name));

        return userAuth(email, name);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
