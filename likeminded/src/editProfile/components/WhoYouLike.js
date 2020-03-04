import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {graphql} from 'react-apollo';
import {getProfileFromClient} from '../queries/editProfileQueries';

class WhoYouLike extends Component {
  render() {
    const {getProfile} = this.props.data;
    console.log(this.props);
    return (
      <View style={{backgroundColor: 'white'}}>
        {getProfile.likes.map(function(like) {
          return (
            <View
              style={{
                margin: 10,
                width: 100,

                alignItems: 'center',
              }}>
              <Image
                style={{width: 100, height: 100, borderRadius: 2}}
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
                }}
              />
              <Text>{'Women in black' || like.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default graphql(getProfileFromClient)(WhoYouLike);
