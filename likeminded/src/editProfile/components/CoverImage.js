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
import {graphql, withApollo} from 'react-apollo';
import {updateCoverImage} from '../mutations/editProfileMutations';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CoverImage extends Component {
  state = {imageUri: ''};

  onImage = () => {
    const {mutate} = this.props;
    console.log('on image clicked');
    ImagePicker.openPicker({
      width: deviceWidth,
      height: deviceHeight / 3,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        mutate({
          variables: {image: image['data'], id: '5d6678e761a5793aacb42c0c'},
        })
          .then(response => {
            this.setState({imageUri: image['data']});
          })
          .catch(err => console.log('error', err));
      })
      .catch(err => console.log('error', err));
  };

  render() {
    console.log(this.props);
    const {uri} = this.props;
    let {imageUri} = this.state;
    imageUri = imageUri ? imageUri : uri;

    return (
      <View>
        {imageUri ? (
          <View>
            <Image
              style={{
                width: deviceWidth,
                height: deviceHeight / 3,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                // background: 'rgba(0, 0, 0, 0.5)',
              }}
              source={{
                uri: `data:image/jpeg;base64,${imageUri}`,
              }}
            />
          </View>
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

export default graphql(updateCoverImage)(CoverImage);
