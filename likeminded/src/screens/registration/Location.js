import React, {Component,Fragment} from 'react';
import {Text, View,StyleSheet} from 'react-native';

class Location extends Component {
  render() {
    return (
      <View style={styles.container} >

          <Text>please type your Location</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
   
  });




export default Location;
