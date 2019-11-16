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

const client = new ApolloClient({
  uri: 'http://192.168.1.8:4000/graphql',
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
