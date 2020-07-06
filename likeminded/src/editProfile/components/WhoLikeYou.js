import React, {Component} from 'react';
import {Text, View, Image, Button} from 'react-native';
import {graphql} from 'react-apollo';
import {getProfileFromClient} from '../queries/editProfileQueries';
import {likeBack, mutateLikeBack} from '../mutations/editProfileMutations';

class WhoLikeYou extends Component {
  onLike = crushId => {
    // 5d6678e761a5793aacb42c0c
    console.log(this.props);
    this.props
      .mutate({variables: {id: '5d6678e761a5793aacb42c0c', crushId}})
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    console.log('tabs', this.props);
    const {getProfile} = this.props.data;
    console.log(this.props);
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        {getProfile.crushes.map(crush => {
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
                <Text
                  onPress={() => this.onLike(crush.id)}
                  style={{color: 'black', fontSize: 13}}>
                  I like you
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default graphql(mutateLikeBack, {name: 'client'})(
  graphql(likeBack, {name: 'server'})(
    graphql(getProfileFromClient)(WhoLikeYou),
  ),
);
