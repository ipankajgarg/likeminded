import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
console.log(deviceWidth, deviceHeight);

class Ball extends Component {
  position = new Animated.ValueXY({
    x: 0,
    y: deviceHeight,
  });

  constructor(props) {
    super();
    this.state = {
      position: this.position,
      dimensions: undefined,
      showLayer: false,
    };
  }

  startAnimate = () => {
    const {height, width} = this.state.dimensions;
    console.log(height, width);
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: deviceHeight - height},
      //   overshootClamping: true,
    }).start();
    this.setState({showLayer: true});
  };
  onClose = () => {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: deviceHeight},
    }).start();
    this.setState({showLayer: false});
  };
  onLayout = event => {
    if (this.state.dimensions) return;
    let {width, height} = event.nativeEvent.layout;
    this.setState({dimensions: {width, height}});
  };

  render() {
    const {showLayer} = this.state;

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            // position: 'absolute',
            top: 0,
            height: 100,
            width: deviceWidth,
            backgroundColor: 'black',
          }}></View>
        {showLayer && (
          <TouchableWithoutFeedback onPress={this.onClose}>
            <View
              style={{
                position: 'absolute',
                zIndex: 99,
                width: deviceWidth,
                height: deviceHeight,
                backgroundColor: 'rgba(211,211,211,0.15)',
                // opacity: 0.5,
                //   top: 100,
              }}></View>
          </TouchableWithoutFeedback>
        )}
        <Text style={{marginTop: 0}} onPress={this.startAnimate}>
          Tap me
        </Text>
        <Text>Close me</Text>
        <Animated.View
          style={[
            this.state.position.getLayout(),
            {
              position: 'absolute',
              width: deviceWidth,
              zIndex: 100,
            },
          ]}>
          {/* <View
              onPress={this.onClose}
              style={{
                backgroundColor: 'rgba(128,128,128,0.1)',
                // position: 'absolute',
                // zIndex: 10,
                // height: deviceHeight,
                // width: deviceWidth,
              }}> */}
          <View
            onLayout={this.onLayout}
            style={{
              backgroundColor: 'white',
              //   height: 225,
              borderRadius: 30,
              // width: deviceWidth,
              // position: 'absolute',

              // zIndex: 50,
            }}>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderBottomWidth: 0.2, borderColor: 'lightgrey'}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                Click me
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
};

export default Ball;
