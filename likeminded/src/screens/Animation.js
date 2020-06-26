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
} from 'react-native';
import AnimatedConponent from '../common/components/Animation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

class Animation extends Component {
  state = {visible: false};
  dummy = [
    {
      text: 'Click me 1',
      callBack: () => {
        console.log('click me1');
        this.setState({visible: false});
        // this.onClose();
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

  render() {
    return (
      <View>
        <Text
          style={{marginTop: 50}}
          onPress={() => this.setState({visible: true})}>
          animation
        </Text>
        <AnimatedConponent
          // backgroundLayerColor="black"
          onClose={() => {
            console.log('tap on layer');
            this.setState({visible: false});
          }}
          visible={this.state.visible}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            {this.dummy.map(({text, callBack}, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  callBack();
                }}
                style={{borderBottomWidth: 0.3, borderColor: 'lightgrey'}}>
                <Text
                  style={{
                    marginLeft: 20,

                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    color: 'black',
                  }}>
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedConponent>
      </View>
    );
  }
}

export default Animation;

// class Ball extends Component {
//   position = new Animated.ValueXY({
//     x: 0,
//     y: deviceHeight,
//   });

//   constructor(props) {
//     super();
//     this.state = {
//       position: this.position,
//       dimensions: undefined,
//       showLayer: false,
//     };
//   }

//   startAnimate = () => {
//     const {height, width} = this.state.dimensions;
//     console.log(height, width);
//     Animated.spring(this.state.position, {
//       toValue: {
//         x: 0,
//         y:
//           Platform.OS === 'ios'
//             ? deviceHeight - height
//             : deviceHeight - height - statusBarHeight,
//       },
//       //   overshootClamping: true,
//     }).start();
//     this.setState({showLayer: true});
//   };
//   onClose = () => {
//     Animated.spring(this.state.position, {
//       toValue: {x: 0, y: deviceHeight},
//     }).start();
//     this.setState({showLayer: false});
//   };
//   onLayout = event => {
//     if (this.state.dimensions) return;
//     let {width, height} = event.nativeEvent.layout;
//     this.setState({dimensions: {width, height}});
//   };

//   render() {
//     const {showLayer} = this.state;

//     var {list, textColor, backgroundColor} = this.props;

//     return (
//       <View style={{flex: 1}}>
//         <View
//           style={{
//             // position: 'absolute',
//             // top: 0,
//             height: 100,
//             width: deviceWidth,
//             backgroundColor: 'black',
//           }}></View>
//         {showLayer && (
//           <TouchableWithoutFeedback onPress={this.onClose}>
//             <View
//               style={{
//                 position: 'absolute',
//                 zIndex: 99,
//                 width: deviceWidth,
//                 height: deviceHeight,
//                 backgroundColor: 'rgba(211,211,211,0.15)',
//               }}></View>
//           </TouchableWithoutFeedback>
//         )}
//         <Text style={{marginTop: 0}} onPress={this.startAnimate}>
//           Tap me
//         </Text>
//         <Text>Close me</Text>
//         <Animated.View
//           style={[
//             this.state.position.getLayout(),
//             {
//               position: 'absolute',
//               width: deviceWidth,
//               zIndex: 100,
//             },
//           ]}>
//           <View
//             onLayout={this.onLayout}
//             style={{
//               backgroundColor: backgroundColor || 'white',
//               borderTopLeftRadius: 30,
//               borderTopRightRadius: 30,
//             }}>
//             {dummy.map(({text, callBack}, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   callBack();
//                   this.onClose();
//                 }}
//                 style={{borderBottomWidth: 0.3, borderColor: 'lightgrey'}}>
//                 <Text
//                   style={{
//                     marginLeft: 20,
//                     // marginBottom: 5,
//                     paddingVertical: 20,
//                     paddingHorizontal: 10,
//                     color: textColor || 'black',
//                   }}>
//                   {text}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </Animated.View>
//       </View>
//     );
//   }
// }

// const styles = {
//   ball: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//     borderWidth: 30,
//     borderColor: 'black',
//   },
// };

// export default Ball;
