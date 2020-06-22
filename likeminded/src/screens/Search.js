import React, {Component} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
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
  changeData = () => {
    this.props.navigation.navigate('EditProfile');
    // this.setState({data: []});
  };

  render() {
    console.log('props', this.props);
    const {isLoading, data} = this.state;
    console.log('state', data);
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

          {/* {data.map(({id, name, profileImage, about}) => (

            
           
          ))} */}

          {isLoading && <Text>Loading...</Text>}
          <FlatList
            data={data}
            renderItem={({item: {id, name, profileImage, about}}) => {
              return (
                <ListItem
                  onPress={this.changeData}
                  key={id}
                  leftAvatar={{source: {uri: profileImage}}}
                  title={name}
                  subtitle={
                    <View>
                      <Text
                        numberOfLines={2}
                        style={{color: '#B2BCC2', fontSize: 12}}>
                        {about}
                      </Text>
                    </View>
                  }
                  // subtitleStyle={{color: '#B2BCC2', fontSize: 12}}
                  bottomDivider
                />
              );
            }}
            keyExtractor={item => item.id}
            extraData={data}
          />
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
