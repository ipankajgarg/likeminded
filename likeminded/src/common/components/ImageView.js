import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImageView({imageURL, height = windowHeight / 4}) {
  return (
    <View style={{width: windowWidth}}>
      <Image
        style={{height, width: '100%'}}
        source={{
          uri: imageURL,
        }}
      />
    </View>
  );
}
