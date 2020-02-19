import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {graphql} from 'react-apollo';
import {updateProfileImage} from '../mutations/editProfileMutations';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class ProfileImage extends Component {
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
        this.props.mutate({
          variables: {image: image['data'], id: '5d6678e761a5793aacb42c0c'},
        });
        this.setState({imageUri: image['data']});
      })
      .catch(err => console.log('error', err));
  };

  render() {
    const {uri} = this.props;
    let {imageUri} = this.state;

    imageUri = imageUri ? imageUri : uri;

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onImage}>
          <View
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
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                // background: 'rgba(0, 0, 0, 0.9)',
              }}
              source={{
                uri: imageUri
                  ? `data:image/jpeg;base64,${imageUri}`
                  : `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default graphql(updateProfileImage)(ProfileImage);
