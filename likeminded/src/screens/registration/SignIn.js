import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {graphql,withApollo} from 'react-apollo';
import {isSignedInMutation} from '../../mutations/userAuthMutation';
//import demo from '../queries/signInQuery';
//import {SocialIcon} from 'react-native-elements';
import SnackBar from 'react-native-snackbar-component';


class SignIn extends Component {
 

  state = {userInfo: null, isSigninInProgress: false, visible: false};

  componentDidMount() {
    console.log('calling');
    //this.revokeAccess()
    // this.getCurrentUser();
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

    const {client} = this.props
  
    this.setState({isSigninInProgress: true});
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {email, name} = userInfo.user;

      const response = await this.props.mutate({
        variables: {email, name},
      });

      if (response.signIn) {
        alert('hurray you are good to go');
      } else {


client.writeData({data:{signInDetails:{email,name}}})

        alert('sorry i am working on it');
      }

      this.setState({userInfo, isSigninInProgress: false});
      


      this.props.navigation.navigate("MobileNumber")
    } catch (error) {
      this.setState({visible: true});
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
    console.log(this.props, 'state', this.state,this.props.client);
    const {visible, isSigninInProgress} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.brandText}>likeminded</Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <GoogleSigninButton
            style={{width: 250, height: 55}}
            size={GoogleSigninButton.Size.Wide}
            onPress={this.signIn}
            disabled={isSigninInProgress}
          />
        </View>
        <SnackBar
          visible={visible}
          textMessage="some error please try later"
          backgroundColor="#ff0000"
          autoHidingTime={2000}
          actionHandler={() => {
            console.log('snackbar button clicked!');
          }}
        />
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

    fontSize: 28,
  },
});

export default withApollo(graphql(isSignedInMutation)(SignIn));
