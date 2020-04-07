import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  Easing,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

const dummy = [
  {
    text: 'Click me 1',
    callBack() {
      console.log('click me1');
    },
  },
  {
    text: 'Click me 2',
    callBack() {
      console.log('click me2');
    },
  },
  {
    text: 'Click me 3',
    callBack() {
      console.log('click me3');
    },
  },
  {
    text: 'Click me 4',
    callBack() {
      console.log('click me4');
    },
  },
];

class Ball extends Component {
  position = new Animated.ValueXY({
    x: 0,
    y: deviceHeight,
  });

  constructor(props) {
    super();

    this.state = {
      dimensions: undefined,

      position: this.position,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && this.state.dimensions) {
      this.startAnimate();
    }
  }

  startAnimate = () => {
    if (!this.state.dimensions) return;
    const {height, width} = this.state.dimensions;
    console.log(height, width, deviceHeight);
    Animated.spring(this.state.position, {
      toValue: {
        x: 0,
        y:
          Platform.OS === 'ios'
            ? deviceHeight - height
            : deviceHeight - height - statusBarHeight,
      },
      // easing: Easing.back(),
      // delay: 5000,
      //   overshootClamping: true,
    }).start();
    // this.setState({showLayer: true});
  };
  onClose = () => {
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: deviceHeight},
      duration: 150,
      //easing: Easing.back(),
    }).start(({finished}) => {
      if (finished) {
        this.props.onClose();
      }
    });

    // this.setState({showLayer: false});
  };
  onLayout = event => {
    console.log('layout');
    if (this.state.dimensions) return;
    let {width, height} = event.nativeEvent.layout;
    this.setState({dimensions: {width, height}});
  };

  render() {
    const {menu, textColor, backgroundColor, visible} = this.props;
    console.log('position layout', this.state.position);
    if (visible)
      return (
        <View style={{position: 'absolute', zIndex: 10000}}>
          {/* <View
          style={{
            // position: 'absolute',
            // top: 0,
            height: 100,
            width: deviceWidth,
            backgroundColor: 'black',
          }}></View> */}
          <TouchableWithoutFeedback onPress={this.onClose}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                // left: 50,
                zIndex: 5000,
                width: deviceWidth,
                height: deviceHeight,
                backgroundColor: 'rgba(211,211,211,0.15)',
              }}></View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              this.state.position.getLayout(),
              {
                position: 'absolute',
                width: deviceWidth,
                zIndex: 6000,
              },
            ]}>
            <View
              onLayout={this.onLayout}
              style={{
                backgroundColor: backgroundColor || 'white',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}>
              {menu.map(({text, callback}, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    callback();
                    this.onClose();
                  }}
                  style={{borderBottomWidth: 0.3, borderColor: 'lightgrey'}}>
                  <Text
                    style={{
                      marginLeft: 20,
                      // marginBottom: 5,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      color: textColor || 'black',
                    }}>
                    {text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      );
    return null;
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
