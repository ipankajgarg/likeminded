import React, {Fragment, Component} from 'react';

import SignIn from './src/screens/registration/SignIn';
import MobileNumber from './src/screens/registration/MobileNumber';
import Location from './src/screens/registration/Location';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
      navigationOptions :()=>({headerTitle:"Mobile Number"})
    },
    Location,
  },
  //{initialRouteName: 'MobileNumber'},
);

const App = createAppContainer(MainNavigator);

export default App;
