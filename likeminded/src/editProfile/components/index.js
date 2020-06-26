import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {graphql} from 'react-apollo';
import CoverImage from './CoverImage';
import ProfileImage from './ProfileImage';
import About from './About';
import TabView from './TabView.js';

import {getProfile} from '../queries/editProfileQueries.js';
import Animation from '../../common/components/Animation';

class EditProfile extends Component {
  constructor(props) {
    super();

    this.state = {visible: false, menu: []};
  }

  showMenu = menu => {
    console.log('menu', menu);
    this.setState({visible: true, menu});
  };

  onClose = () => {
    this.setState({visible: false, menu: []});
  };

  render() {
    const {getProfile, loading} = this.props.data;
    const {navigation} = this.props;
    const {visible, menu} = this.state;

    return (
      !loading && (
        <View style={{flex: 1}}>
          {/* <Animation visible={visible} menu={menu} /> */}
          <Animation
            // backgroundLayerColor="black"
            onClose={this.onClose}
            visible={this.state.visible}>
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}>
              {menu.map(({text, callback}, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    callback();
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
          </Animation>

          <ScrollView>
            <CoverImage showMenu={this.showMenu} uri={getProfile.coverImage} />
            <ProfileImage
              showMenu={this.showMenu}
              uri={getProfile.profileImage}
            />

            <View style={{alignItems: 'center', marginTop: 70}}>
              <Text style={{fontWeight: 'bold'}}>Pankaj garg</Text>
            </View>

            <About about={getProfile.about} navigation={navigation} />
            <TabView crushes={getProfile.crushes} likes={getProfile.likes} />
          </ScrollView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default graphql(getProfile)(EditProfile);
