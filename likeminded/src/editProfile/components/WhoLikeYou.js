import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {graphql} from 'react-apollo';
import {getProfileFromClient} from '../queries/editProfileQueries';

class WhoLikeYou extends Component {
  render() {
    console.log('tabs', this.props);
    const {getProfile} = this.props.data;

    return (
      <View>
        {getProfile.crushes.map(function(crush) {
          return (
            <View>
              <Text>{crush.email}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default graphql(getProfileFromClient)(WhoLikeYou);
