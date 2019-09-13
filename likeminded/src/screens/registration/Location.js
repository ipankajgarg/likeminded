import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';
import Permissions from 'react-native-permissions';
import {signUp} from '../../mutations/userAuthMutation';
import {graphql} from 'react-apollo';

var NY = {
  lat: 28.523661956226178,
  lng: 77.39765779376695,
};

class Location extends Component {
  componentDidMount() {
    console.log('mounting');

    Permissions.request('location')
      .then(response => {
        console.log(response);
        if (response == 'authorized') {
          this.fetchLocation();
        } else {
          Permissions.openSettings();
        }
      })
      .catch(err => console.log('err', err));
  }

  signUpUser = ({country,countryCode,formattedAddress,locality,streetName,position} )=> {
    this.props
      .mutate({
        variables: {email: 'start@gmail.com', mobileNumber: 1233, location:{country,countryCode,formattedAddress,locality,streetName,position}},
      })
      .then(res => {
        console.log('done with query', res);
      })
      .catch(err => {
        console.log('err with query', err);
      });
  };

  fetchLocation = () => {
    const {navigation} = this.props;

    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);

        const {latitude: lat, longitude: lng} = position.coords;

        Geocoder.geocodePosition({lat, lng})
          .then(res => {
            console.log('res', res);
            this.signUpUser(res[0]);

            // navigation.navigate("Home")
          })
          .catch(err => console.log(err));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>please type your Location</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default graphql(signUp)(Location);
