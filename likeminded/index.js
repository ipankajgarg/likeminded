/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import ApolloClient, {gql} from 'apollo-boost';
//import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloProvider} from 'react-apollo';
import App from './App';
import {name as appName} from './app.json';
import {InMemoryCache} from 'apollo-cache-inmemory';

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id,
});

const client = new ApolloClient({
  // __typename: false,
  uri: 'http://192.168.1.4:4000/graphql',
  cache,
  resolvers: {
    Mutation: {
      mutateLikeBack(parentValue, {id, crushId}, {cache, getCacheKey}, info) {
        id = getCacheKey({__typename: 'userType', id});
        console.log(id, crushId);

        console.log(cache);
        //var profile = cache.readFragment({fragment, id});
        // country = { ...country, name: data };
        var profile = cache.data.data[id];
        console.log('profile', profile);

        profile.crushes = profile.crushes.filter(function(crush) {
          return crush.id !== crushId;
        });
        console.log('updated', profile);

        cache.writeData({__typename: 'userType', id, data: profile});
        return null;
      },
    },
  },
});

// cache.writeData({
//   data: {
//     getProfile: {
//       id: '5d6678e761a5793aacb42c0c',
//       about: 'please fill me',
//       profileImage: '',
//       coverImage: '',
//       email: '',
//       name: 'pankaj garg',
//       gender: '',
//       crushes: [],
//       likes: [],
//       __typename: 'userType',
//     },
//     // networkStatus: {
//     //   __typename: 'NetworkStatus',
//     //   isConnected: false,
//     // },
//   },
// });
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
