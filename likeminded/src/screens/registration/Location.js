import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';

var NY = {
  lat: 28.523661956226178,
  lng: 77.39765779376695,
};

class Location extends Component {
  componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    if (this.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position', position);

          const {latitude: lat, longitude: lng} = position.coords;

          Geocoder.geocodePosition({lat, lng})
            .then(res => {
              console.log('res', res);
            })
            .catch(err => console.log(err));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      // .then((data)=>console.log("position",data)).catch((err)=>console.log("err",err))
    }
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
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

export default Location;
