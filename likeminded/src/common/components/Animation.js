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

class Animation extends Component {
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

  // componentWillUpdate(nextProps) {
  //   if (!nextProps.visible && this.props.visible) {
  //     console.log('closing');
  //     this.onClose();
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.visible && this.props.visible) {
      console.log('closing');
      this.onClose();
      return false;
    }
    return true;
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
      //duration: 5000,
      //easing: Easing.back(),
      // delay: 2000,
      //overshootClamping: true,
    }).start();
    // this.setState({showLayer: true});
  };
  onClose = () => {
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: deviceHeight},
      duration: 200,
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
    const {visible, backgroundLayerColor} = this.props;
    console.log('position layout', this.state.position);
    //hack for zindex:1
    if (visible)
      return (
        <View
          style={{
            position: 'absolute',
            ...(Platform.OS === 'ios' && {zIndex: 1}),
          }}>
          <Animated.View
            style={[
              this.state.position.getLayout(),
              {
                position: 'absolute',
                width: deviceWidth,
                zIndex: 1000,
              },
            ]}>
            <View onLayout={this.onLayout}>{this.props.children}</View>
          </Animated.View>
          <TouchableWithoutFeedback onPress={this.onClose}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                zIndex: 100,
                width: deviceWidth,
                height: deviceHeight,
                backgroundColor:
                  backgroundLayerColor || 'rgba(211,211,211,0.15)',
              }}></View>
          </TouchableWithoutFeedback>
        </View>
      );

    return null;
  }
}

export default Animation;
