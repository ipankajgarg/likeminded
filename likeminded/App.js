/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin, GoogleSigninButton,statusCodes} from 'react-native-google-signin';
//import console = require('console');

GoogleSignin.configure({
  webClientId:"1014868015125-pupqkofkoikrrg8f3beot8mmibcul5bi.apps.googleusercontent.com"
});



// signIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     console.log(userInfo)
//     //this.setState({ userInfo });
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//       console.log("cancelled")
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (f.e. sign in) is in progress already
//       console.log("progress")
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
// console.log("service not available")
//     } else {
//       // some other error happened
//       console.log("err" ,error)
//     }
//   }
// };




// const App = () => {
// console.log("calling")

//   return (
//     <Fragment>
//       <Text>hello world</Text>
//       <GoogleSigninButton
//         style={{width: 192, height: 48}}
//        // size={GoogleSigninButton.Size.Wide}
//         //color={GoogleSigninButton.Color.Dark}
//         onPress={signIn}
//         // disabled={this.state.isSigninInProgress}
//       />
//     </Fragment>
//   );
// };


class App extends Component{





  componentDidMount(){

this.revokeAccess()

    GoogleSignin.configure({
      webClientId:"1014868015125-pupqkofkoikrrg8f3beot8mmibcul5bi.apps.googleusercontent.com"
    });
    // try {
    //   await GoogleSignin.revokeAccess();
    //   await GoogleSignin.signOut();
    //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
    // } catch (error) {
    //   console.error(error);
    // }
  }



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
      console.log(userInfo)
      //this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log("progress")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
  console.log("service not available")
      } else {
        // some other error happened
        console.log("err" ,error)
      }
    }
  };





render(){

return (
<Fragment>
      <Text>hello world</Text>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
       // size={GoogleSigninButton.Size.Wide}
        //color={GoogleSigninButton.Color.Dark}
        onPress={this.signIn}
        // disabled={this.state.isSigninInProgress}
      />
    </Fragment>

)


}

}



// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
