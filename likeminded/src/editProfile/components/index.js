import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {graphql} from 'react-apollo';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import About from './About';
import TabView from './TabView.js';

import {getProfile} from '../queries/editProfileQueries.js';

class EditProfile extends Component {
  render() {
    console.log('props', this.props);
    const {getProfile, loading} = this.props.data;
    const {navigation} = this.props;
    return (
      !loading && (
        <View style={{flex: 1}}>
          <ScrollView>
            <CoverImage uri={getProfile.coverImage} />
            <ProfileImage uri={getProfile.profileImage} />

            <View style={{alignItems: 'center', marginTop: 70}}>
              <Text style={{fontWeight: 'bold'}}>Pankaj garg</Text>
            </View>

            <About about={getProfile.about} navigation={navigation} />
            <TabView crushes={getProfile.crushes} likes={getProfile.likes} />
          </ScrollView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default graphql(getProfile, {
  options: {
    fetchPolicy: 'network-only',
    ssr: false,
  },
})(EditProfile);
