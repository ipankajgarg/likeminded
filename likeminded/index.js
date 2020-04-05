/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import ApolloClient from 'apollo-boost';
//import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloProvider} from 'react-apollo';
import App from './App';
import {name as appName} from './app.json';
import {InMemoryCache} from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const client = new ApolloClient({
  // __typename: false,
  uri: 'http://192.168.1.7:4000/graphql',
  cache,
  resolvers: {},
});

cache.writeData({
  data: {
    getProfile: {
      id: '',
      about: 'please fill me',
      profileImage: '',
      coverImage: '',
      email: '',
      name: 'pankaj garg',
      gender: '',
      crushes: [],
      likes: [],
      __typename: 'userType',
    },
    // networkStatus: {
    //   __typename: 'NetworkStatus',
    //   isConnected: false,
    // },
  },
});
console.log('cache', cache);
// id
//       about
//       profileImage
//       coverImage
//       email
//       name
//       gender
//       crushes {
//         id
//         name
//         email
//         mobileNumber
//         id
//         profileImage
//       }
//       likes {
//         id
//         name
//         email
//         profileImage

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
