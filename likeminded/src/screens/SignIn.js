import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {graphql} from 'react-apollo';
import signInMutation from '../mutations/signInMutation';
//import demo from '../queries/signInQuery';
//import {SocialIcon} from 'react-native-elements';

class SignIn extends Component {
  // constructor(props){
  //     super();
  //     this.signOut()
  // }

  state = {userInfo: null};

  componentDidMount() {
    console.log('calling');
    //this.revokeAccess()
    this.getCurrentUser();
    GoogleSignin.configure({
      webClientId:
        '1014868015125-pupqkofkoikrrg8f3beot8mmibcul5bi.apps.googleusercontent.com',
      iosClientId:
        '1014868015125-rfgkath1lvee3vlod3qm6s1m446u5iqh.apps.googleusercontent.com',
    });
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('currentni', currentUser);
    //this.setState({ currentUser });
  };

  revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {email, name} = userInfo.user;

      this.props
        .mutate({
          variables: {email, name},
        })
        .then(data => {
          if (data.signIn) {
            alert('hurray you are good to go');
          } else {
            alert('sorry i am working on it');
          }
        })
        .catch(err => console.log('error', err));

      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('service not available');
      } else {
        // some other error happened
        console.log('err', error);
      }
    }
  };

  render() {
    console.log(this.props, 'state', this.state);

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.brandText}>likeminded</Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          {/* <SocialIcon type="twitter" /> */}

          <GoogleSigninButton
            style={{width: 192, height: 48}}
            // size={GoogleSigninButton.Size.Wide}
            //color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            // disabled={this.state.isSigninInProgress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  brandText: {
    fontWeight: 'bold',
    marginTop: Platform.OS === 'ios' ? 200 : 100,

    fontSize: 24,
  },
});

export default graphql(signInMutation)(SignIn);
