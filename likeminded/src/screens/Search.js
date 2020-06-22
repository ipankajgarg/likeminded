import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {gql} from 'apollo-boost';
import {withApollo, graphql} from 'react-apollo';
import {ListItem} from 'react-native-elements';

class Search extends Component {
  state = {isLoading: false, data: []};

  onChangeText = name => {
    const {client} = this.props;
    this.setState({isLoading: true});
    name = name.toLowerCase();
    client
      .query({query, variables: {name}})
      .then(({data: {searchedProfiles}}) => {
        console.log(searchedProfiles);
        this.setState({data: searchedProfiles, isLoading: false});
      })
      .catch(err => console.log(err));
  };

  debounce = () => {
    let timeout;

    return name => {
      clearTimeout(timeout);

      timeout = setTimeout(() => this.onChangeText(name), 500);
    };
  };

  render() {
    console.log('props', this.props);
    const {isLoading, data} = this.state;
    const debounce = this.debounce();
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginTop: 40, marginHorizontal: 'auto'}}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: '#F9F9F9',
              padding: 10,
              minWidth: '75%',
            }}>
            <TextInput
              onChangeText={text => debounce(text)}
              autoFocus
              placeholder="Search"
            />
          </View>

          {data.map(({id, name, profileImage, about}) => (
            <ListItem
              key={id}
              leftAvatar={{source: {uri: profileImage}}}
              title={name}
              subtitle={about}
              bottomDivider
            />
          ))}
          {isLoading && <Text>Loading...</Text>}
        </View>
      </View>
    );
  }
}

const query = gql`
  query SearchedProfiles($name: String!) {
    searchedProfiles(name: $name) {
      id
      name
      about
      profileImage
    }
  }
`;

export default withApollo(Search);
