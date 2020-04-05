import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {graphql, withApollo} from 'react-apollo';
import {updateCoverImage} from '../mutations/editProfileMutations';
import Animation from '../../common/components/Animation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CoverImage extends Component {
  state = {imageUri: '', showMenu: false, visibleModal: false};

  onImage = () => {
    this.setState({showMenu: true});
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
    console.log(this.props);
    const {uri} = this.props;
    let {imageUri, visibleModal, showMenu} = this.state;
    imageUri = imageUri ? imageUri : uri;

    return (
      <View>
        {imageUri ? (
          <TouchableWithoutFeedback onPress={this.onImage}>
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
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={this.changeImage}>
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
        <Animation menu={this.menuList()} showMenu={showMenu} />
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

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default graphql(updateCoverImage)(CoverImage);
