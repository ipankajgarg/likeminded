import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import About from './About';

class EditProfile extends Component {
  render() {
    return (
      <View>
        <CoverImage uri="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        <ProfileImage />

        <View style={{alignItems: 'center', marginTop: 70}}>
          <Text style={{fontWeight: 'bold'}}>Pankaj garg</Text>
        </View>

        <About />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default EditProfile;
