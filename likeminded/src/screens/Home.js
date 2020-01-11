import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Home extends Component {
  state = {uri: ''};

  onImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);
        this.setState({uri: image['data']});
      })
      .catch(err => console.log('error', err));
  };

  render() {
    // console.log('render');
    const {uri} = this.state;
    console.log(this.state);
    return (
      <View style={{flex: 1}}>
        {/* <TouchableWithoutFeedback onPress={this.onImage}>
          <Text>this is my new cool home page</Text>
        </TouchableWithoutFeedback> */}
        <View style={{position: 'relative'}}>
          <Image
            style={{
              width: deviceWidth,
              height: deviceHeight / 3,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            source={{
              uri: `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg`,
            }}
          />

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
              style={{height: 120, width: 120, borderRadius: 60}}
              source={{
                uri: `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`,
              }}
            />
          </View>
        </View>

        <View style={{alignItems: 'center', marginTop: 70}}>
          <Text style={{fontWeight: 'bold'}}>Pankaj garg</Text>
        </View>
        <View>
          <TextInput
            style={{marginHorizontal: 40}}
            // value="write about yourseld"
            multiline
          />

          <View></View>
        </View>
      </View>
    );
  }
}

export default Home;
