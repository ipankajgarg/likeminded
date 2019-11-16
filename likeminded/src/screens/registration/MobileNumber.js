import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {graphql, withApollo} from 'react-apollo';
import {isMobileNumberExistMutation} from '../../mutations/userAuthMutation';
import SnackBar from 'react-native-snackbar-component';

class MobileNumber extends Component {
  state = {input: '', errMessage: '', visible: false};

  onSubmit = async () => {
    console.log('submit');
    const {input} = this.state;
    const {mutate, navigation, client} = this.props;
    console.log('input', input, typeof input);

    try {
      const repsonse = await mutate({
        variables: {mobileNumber: Number(input)},
      });
      client.writeData({data: {mobileNumber: input}});
      navigation.navigate('Location');
      console.log('response', repsonse);
    } catch (err) {
      this.setState({visible: true, errMessage: err.message});
      setTimeout(function() {
        console.log('print', this);
        this.setState({visible: false});
      }, 2000);
      console.log('err', err, err.message);
    }
  };

  render() {
    const {
      container,
      headingStyle,
      inputStyle,
      circle,
      inputContainer,
    } = styles;
    const {input, errMessage, visible} = this.state;

    console.log('rendering', this.props);

    return (
      <View style={container}>
        <Text style={headingStyle}>What's your mobile number</Text>

        <TextInput
          autoFocus
          maxLength={10}
          keyboardType="numeric"
          placeholder="Enter your mobile number"
          style={inputStyle}
          value={input}
          onChangeText={input => this.setState({input})}
          onSubmitEditing={this.onSubmit}
        />
        <TouchableOpacity onPress={this.onSubmit}>
          <View
            style={[circle, {display: input.length == 10 ? 'flex' : 'none'}]}>
            <Icon name="arrow-forward" color="gray" />
          </View>
        </TouchableOpacity>
        <SnackBar
          visible={visible}
          textMessage={errMessage}
          backgroundColor="#ff0000"
          autoHidingTime={2000}
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
    marginTop: 100,
  },
  headingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    minWidth: 200,
    height: 40,
    marginTop: 30,
  },

  inputContainer: {display: 'flex', flexDirection: 'row', marginTop: 40},

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

export default withApollo(graphql(isMobileNumberExistMutation)(MobileNumber));
