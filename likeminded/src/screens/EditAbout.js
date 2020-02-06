import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Platform} from 'react-native';

class EditAbout extends Component {
  render() {
    const {inputStyle} = styles;

    return (
      <View style={inputStyle}>
        <TextInput
          placeholder="About yourself"
          style={{paddingHorizontal: 10}}
          autoFocus={true}
          multiline={true}
        />
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

export default EditAbout;
