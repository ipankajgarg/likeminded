import React, {Component} from 'react';
import {Text, View} from 'react-native';

class About extends Component {
  render() {
    const {about} = this.props;

    return (
      <View style={{paddingHorizontal: 20, marginVertical: 20}}>
        {!about && (
          <View
            style={{
              borderColor: 'lightgrey',
              borderStyle: 'dashed',
              borderRadius: 5,
              height: 50,
              borderWidth: 1,
            }}>
            <Text style={{lineHeight: 50, marginLeft: 30, color: 'grey'}}>
              {' '}
              Write about Yourself{' '}
            </Text>
          </View>
        )}

        <Text numberOfLines={3} style={{lineHeight: 20}}>
          In his 1904 book Nostromo: A Tale of the Seaboard, Joseph Conrad
          wrote, “A nickname may be the best record of a success. That’s what I
          call putting the face of a joke upon the body of a trth.”
        </Text>
      </View>
    );
  }
}

export default About;
