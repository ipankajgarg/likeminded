import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';

class InterestedIn extends Component {
  state = {gender: 'male', minAge: 18, maxAge: 24};

  onSelect = gender => {
    console.log(gender);
    this.setState({gender});
  };

  onAgechange = (minAge, maxAge) => {
    this.setState({minAge, maxAge});
  };

  onSubmit = () => {};

  render() {
    const {
      container,
      headingStyle,
      genderContainer,
      label,
      heartIcon,
      circle,
    } = styles;
    const {gender, minAge, maxAge} = this.state;

    return (
      <View style={container}>
        <Text style={headingStyle}>What's your interest?</Text>

        <View style={genderContainer}>
          <TouchableOpacity onPress={() => this.onSelect('male')}>
            <View style={{position: 'relative'}}>
              <Image
                style={{width: 85, height: 85}}
                source={{
                  uri:
                    'https://png.pngtree.com/svg/20170623/male_avatar_182045.png',
                }}
              />
              <Image
                style={[heartIcon, {opacity: gender === 'male' ? 1 : 0}]}
                source={{
                  uri: 'https://img.icons8.com/dusk/2x/like.png',
                }}
              />
              <Text style={label}>Male</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect('female')}>
            <View>
              <Image
                style={{width: 85, height: 85}}
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawaczxlrR1CSZ13izFcIPYumixGYMGtTgSilqPNsVCVfn1RqRtQ&s',
                }}
              />
              <Image
                style={[
                  heartIcon,
                  {opacity: gender === 'female' ? 1 : 0, right: -5},
                ]}
                source={{
                  uri: 'https://img.icons8.com/dusk/2x/like.png',
                }}
              />
              <Text style={label}>Female</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Text style={headingStyle}>Of age</Text>

          <View style={{posiiton: 'relative', width: '50%', height: 40}}>
            <Slider
              step={1}
              value={minAge}
              onValueChange={val => this.onAgechange(val, maxAge)}
              minimumValue={14}
              maximumValue={100}
            />
            <Text style={{position: 'absolute', right: -20, top: 10}}>
              {minAge}
            </Text>
          </View>
          <Text>To</Text>
          <View style={{posiiton: 'relative', width: '50%', height: 40}}>
            <Slider
              step={1}
              value={minAge > maxAge ? minAge : maxAge}
              onValueChange={val => this.onAgechange(minAge, val)}
              minimumValue={minAge}
              maximumValue={100}
            />
            <Text style={{position: 'absolute', right: -20, top: 10}}>
              {minAge > maxAge ? minAge : maxAge}
            </Text>
          </View>
          <TouchableOpacity onPress={this.onSubmit}>
            <View style={[circle]}>
              <Icon name="arrow-forward" color="gray" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 50,
  },
  headingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  genderContainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  label: {
    textAlign: 'center',
    marginTop: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 20,
    right: 0,
    zIndex: 5,
  },
  circle: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default InterestedIn;
