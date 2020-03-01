import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {graphql} from 'react-apollo';
import {getProfileFromClient} from '../queries/editProfileQueries';

class WhoYouLike extends Component {
  render() {
    const {getProfile} = this.props.data;
    console.log(this.props);
    return (
      <View>
        {getProfile.likes.map(function(like) {
          return (
            <View>
              <Text>{like.name || like.email}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default graphql(getProfileFromClient)(WhoYouLike);
