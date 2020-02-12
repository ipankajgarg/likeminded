import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const FirstRoute = () => (
  <View style={[styles.scene]}>
    <Text>hello world</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene]}>
    <Text>new world</Text>
  </View>
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    first: FirstRoute,
    second: SecondRoute,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        //fontWeight: 500,
        fontSize: 15,
      },
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      indicatorStyle: {color: 'black', backgroundColor: 'black'},
      pressOpacity: 0.2,
    },
    // swipeEnabled: true,
  },
);

Navigator = createAppContainer(TabNavigator);

class TabView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabView;
