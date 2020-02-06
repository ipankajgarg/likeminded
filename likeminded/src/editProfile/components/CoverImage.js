import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CoverImage extends Component {
  state = {imageUri: ''};

  onImage = () => {
    console.log('on image clicked');
    ImagePicker.openPicker({
      width: deviceWidth,
      height: deviceHeight / 3,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);
        this.setState({imageUri: image['data']});
      })
      .catch(err => console.log('error', err));
  };

  render() {
    // const {uri} = this.props;
    const {imageUri} = this.state;
    console.log(imageUri);
    return (
      <View>
        {imageUri ? (
          <Image
            style={{
              width: deviceWidth,
              height: deviceHeight / 3,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            source={{
              uri: `data:image/jpeg;base64,${imageUri}`,
            }}
          />
        ) : (
          <TouchableWithoutFeedback onPress={this.onImage}>
            <View
              style={{
                width: deviceWidth,
                height: deviceHeight / 3,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#1c1e21',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  position: 'absolute',
                  color: 'white',
                }}>
                Add Cover Photo
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* <View
      style={{
        position: 'absolute',
        bottom: -60,
        //  left: '50%',
        alignSelf: 'center',
        // borderColor: 'black',
        // backgroundColor: 'black',
        zIndex: 10,
        // transform: 'tr',
      }}>
      <Image
        style={{height: 120, width: 120, borderRadius: 60}}
        source={{
          uri: `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`,
        }}
      />
    </View> */}
        {/* <Text>i am image</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default CoverImage;
