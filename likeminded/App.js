import React, {Fragment, Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from './src/screens/registration/SignIn';
import MobileNumber from './src/screens/registration/MobileNumber';
import Location from './src/screens/registration/Location';
import Home from './src/screens/Home';
import InterestedIn from './src/screens/registration/InterestedIn';
import EditProfile from './src/screens/EditProfile';
import EditAbout from './src/screens/EditAbout';

const MainNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
    MobileNumber: {
      screen: MobileNumber,
      navigationOptions: () => ({headerTitle: 'Mobile Number'}),
    },
    Location: {screen: Location, navigationOptions: () => ({header: null})},

    Home: {screen: Home, navigationOptions: () => ({header: null})},
    InterestedIn: {
      screen: InterestedIn,
      navigationOptions: () => ({headerTitle: 'Interested In'}),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: () => ({header: null}),
    },
    EditAbout: {
      screen: EditAbout,
    },
  },
  {initialRouteName: 'EditAbout'},
);

const App = createAppContainer(MainNavigator);

export default App;
