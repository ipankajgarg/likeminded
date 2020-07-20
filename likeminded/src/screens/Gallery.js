import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {graphql} from 'react-apollo';
import {fetchImages} from '../queries/fetchImagesQuery';
import ImageView from '../common/components/ImageView';

const windowHeight = Dimensions.get('window').height;

class Gallery extends Component {
  renderImages = ({item, index}) => {
    console.log(item, index);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('press', this.props);

          this.props.navigation.navigate('Profile', {item});
        }}>
        <View style={{borderTopWidth: index > 0 ? 1 : 0, borderColor: 'white'}}>
          <ImageView imageURL={item.profileImage} height={windowHeight / 4} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {loading, getProfileImages, error} = this.props.data;
    console.log(this.props);
    if (loading || error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{`Loading...${loading} ${error}`}</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={getProfileImages}
          renderItem={this.renderImages}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default graphql(fetchImages)(Gallery);
