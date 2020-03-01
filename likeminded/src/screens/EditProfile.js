import React, {Component} from 'react';
import {View, Text} from 'react-native';
import EditProfileComponent from '../editProfile/components';

class EditProfile extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1}}>
        <EditProfileComponent navigation={navigation} />
      </View>
    );
  }
}

export default EditProfile;
