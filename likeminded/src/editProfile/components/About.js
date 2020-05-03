import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';

class About extends Component {
  render() {
    const {about, navigation} = this.props;

    return (
      <View style={{paddingHorizontal: 20, marginVertical: 20}}>
        {!about ? (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('EditAbout', {
                about,
              })
            }>
            <View
              style={{
                borderColor: 'lightgrey',
                borderStyle: 'dashed',
                borderRadius: 5,
                height: 50,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  lineHeight: 50,
                  marginLeft: 30,
                  color: 'grey',
                }}>
                {' '}
                Write about Yourself{' '}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <Text
            onPress={() =>
              navigation.navigate('EditAbout', {
                about,
              })
            }
            numberOfLines={3}
            style={{lineHeight: 20}}>
            {about}
          </Text>
        )}
      </View>
    );
  }
}

export default About;
