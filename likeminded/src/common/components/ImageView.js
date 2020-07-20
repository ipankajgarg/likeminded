import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImageView({imageURL, height = windowHeight / 4}) {
  return (
    <View style={{width: windowWidth}}>
      <Image
        style={{height, width: '100%'}}
        source={{
          uri: imageURL,
        }}
      />
    </View>
  );
}

// export default class ImageView extends Component {
//   state = {height: 50};

//   componentDidMount() {
//     const {imageURL} = this.props;
//     Image.getSize(imageURL, (width, height) => {
//       console.log(height);
//       this.setState({height});
//     });
//   }

//   render() {
//     const {height} = this.state;
//     const {imageURL} = this.props;
//     return (
//       <View style={{width: windowWidth}}>
//         <Image
//           style={{width: windowWidth, height}}
//           source={{
//             uri: imageURL,
//           }}
//           // resizeMode="contain"
//         />
//       </View>
//     );
//   }
// }
