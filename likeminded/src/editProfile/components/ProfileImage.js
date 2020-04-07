import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {graphql} from 'react-apollo';
import {updateProfileImage} from '../mutations/editProfileMutations';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class ProfileImage extends Component {
  state = {imageUri: '', showMenu: false, visibleModal: false};

  onImage = () => {
    // this.setState({showMenu: true});
    const {showMenu} = this.props;

    const menu = this.menuList();
    showMenu(menu);
  };

  changeImage = () => {
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

  onOpenModal = () => {
    this.setState({visibleModal: true});
  };

  menuList = () => {
    const {changeImage, onOpenModal} = this;

    return [
      {
        text: 'View Photo',
        callback: onOpenModal,
      },
      {text: 'Change Photo', callback: changeImage},
    ];
  };

  render() {
    const {uri} = this.props;
    let {imageUri, visibleModal} = this.state;

    imageUri = imageUri ? imageUri : uri;

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onImage}>
          <View
            style={{
              position: 'absolute',
              top: -60,
              //  left: '50%',
              alignSelf: 'center',
              // borderColor: 'black',
              // backgroundColor: 'black',
              // zIndex: 10,
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

        <Modal visible={visibleModal}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{position: 'absolute', top: 50, left: 20}}
              onPress={() => this.setState({visibleModal: false})}>
              Close
            </Text>
            <Image
              style={{
                width: deviceWidth,
                height: deviceHeight / 2,
                // borderBottomLeftRadius: 50,
                // borderBottomRightRadius: 50,
                // background: 'rgba(0, 0, 0, 0.5)',
              }}
              source={{
                uri: `data:image/jpeg;base64,${imageUri}`,
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default graphql(updateProfileImage)(ProfileImage);
