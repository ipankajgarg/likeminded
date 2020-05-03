import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WhoLikeYou from './WhoLikeYou';
import WhoYouLike from './WhoYouLike';

const Tab = createMaterialTopTabNavigator();

function TabView({crushes, likes}) {
  return (
    <NavigationContainer style={{zIndex: 10}}>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: 'white',
            // top: 100,
            zIndex: 10,
          },
          labelStyle: {
            //fontWeight: 500,
            fontSize: 15,
            textTransform: 'capitalize',
          },
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          indicatorStyle: {color: 'black', backgroundColor: 'black'},
          pressOpacity: 0.2,
        }}>
        <Tab.Screen name="Who like you" component={WhoLikeYou} />
        <Tab.Screen name="Who you like" component={WhoYouLike} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabView;
