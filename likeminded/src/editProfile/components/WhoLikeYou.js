import React, {Component} from 'react';
import {Text, View, Image, Button} from 'react-native';
import {graphql} from 'react-apollo';
import {getProfileFromClient} from '../queries/editProfileQueries';

class WhoLikeYou extends Component {
  render() {
    console.log('tabs', this.props);
    const {getProfile} = this.props.data;

    return (
      <View style={{backgroundColor: 'white'}}>
        {getProfile.crushes.map(function(crush) {
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
                    'https://images.unsplash.com/photo-1534352592548-bab508b79626?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                }}
              />
              <Text>{'Women in red' || crush.name}</Text>
              <View
                style={{
                  width: 100,
                  height: 25,
                  marginVertical: 5,

                  //backgroundColor: '#696969',
                  borderRadius: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'black',
                  borderWidth: 1,
                }}>
                <Text style={{color: 'black', fontSize: 13}}>I like you</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default graphql(getProfileFromClient)(WhoLikeYou);
