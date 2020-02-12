import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import About from './About';
import TabView from './TabView.js';

class EditProfile extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <CoverImage uri="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
          <ProfileImage />

          <View style={{alignItems: 'center', marginTop: 70}}>
            <Text style={{fontWeight: 'bold'}}>Pankaj garg</Text>
          </View>

          <About />
          <TabView />
        </ScrollView>
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
