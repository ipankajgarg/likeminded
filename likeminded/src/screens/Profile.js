import React, {Component} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import ImageView from '../common/components/ImageView';

const windowHeight = Dimensions.get('window').height;

class Profile extends Component {
  render() {
    console.log(this.props, this.props.navigation.getParam('item'));
    const profile = this.props.navigation.getParam('item');
    return (
      <View>
        {/* <Text>Hi there!</Text> */}
        <Image
          source={{uri: profile.profileImage}}
          style={{width: '100%', height: windowHeight}}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default Profile;
