import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Platform} from 'react-native';
import {updateAboutMe} from '../mutations/editAboutMutation';
import {graphql} from 'react-apollo';

class EditAbout extends Component {
  state = {about: ''};

  onChange = about => {
    this.setState({about});
  };

  onSubmit = () => {
    console.log('in function');
    const {mutate, navigation} = this.props;
    const {about} = this.state;

    mutate({variables: {id: '5d6678e761a5793aacb42c0c', about}})
      .then(data => {
        navigation.navigate('EditProfile');
      })
      .catch(err => console.log(err));
  };

  render() {
    const {inputStyle} = styles;
    const {about} = this.state;

    return (
      <View style={inputStyle}>
        <TextInput
          value={about}
          onChangeText={text => this.onChange(text)}
          placeholder="About yourself"
          style={{paddingHorizontal: 10}}
          autoFocus={true}
          multiline={true}
        />

        <Text onPress={this.onSubmit}>click me</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    // minWidth: 200,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    // marginTop: 30,
  },
});

export default graphql(updateAboutMe)(EditAbout);
