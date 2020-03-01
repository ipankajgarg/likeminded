import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WhoLikeYou from './WhoLikeYou';
import WhoYouLike from './WhoYouLike';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function TabView({crushes, likes}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: 'white',
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
