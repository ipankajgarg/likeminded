import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  // Animated,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {Header} from 'react-navigation-stack';

const headerBg = '#282f3f';
const activeBg = '#384153';
const normalBg = '#434e64';
const activeText = '#ffffff';
const normalText = '#222222';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
    <Text>hello world</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    first: FirstRoute,
    second: SecondRoute,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        //fontWeight: 500,
        fontSize: 15,
      },
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      indicatorStyle: {color: 'black', backgroundColor: 'black'},
      pressOpacity: 0.2,
    },
  },
);

Navigator = createAppContainer(TabNavigator);

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Home extends Component {
  state = {
    uri: '',
    value:
      'Knowing how to write a paragraph is incredibly important. It’s a basic aspect of writing, and it is something that everyone should know how to do. There is a specific structure that you have to follow when you’re writing a paragraph. This structure helps make it easier for the reader to understand what is going on. Through writing good paragraphs, a person can communicate a lot better through their writing.',
  };

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
      //

      <View style={{flex: 1}}>
        <ScrollView>
          {/* <TouchableWithoutFeedback onPress={this.onImage}>
          <Text>this is my new cool home page</Text>
        </TouchableWithoutFeedback> */}

          <View>
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

          <TextInput
            style={{
              marginHorizontal: 40,
            }}
            returnKeyLabel="Done"
            returnKeyType="done"
            value={this.state.value}
            onChangeText={value => this.setState({value})}
            multiline
          />
          <View style={{flex: 1}} />

          <Navigator />
        </ScrollView>
      </View>
      // </KeyboardAvoidingView>
      //
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default Home;
