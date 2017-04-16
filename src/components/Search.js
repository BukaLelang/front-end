import React, { Component } from 'react'
import { Container, Content, Header, InputGroup, Input, Icon, Button, Text } from 'native-base'
import ImagePicker from 'react-native-image-picker'

import Styles from '../assets/styles/Search.styles'

var options = {
     title: 'Pick Picture',
     storageOptions: {
       skipBackup: true,
       path: '../images'
     }
}

class SearchBarNav extends Component {
  _coba () {
    // console.log(ImagePicker.showImagePicker);
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // Open Image Library:
        // ImagePicker.launchImageLibrary(options, (response)  => {
        //   // Same code as in above section!
        // });
        let source = { image: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // dispatch(creatorActions.attach(key, source, card))
        console.log(source);
      }
});
  }

  render () {
    return (
      <Container>
        <Header searchBar rounded style={Styles.Header}>
          <InputGroup regular style={Styles.InputGroupBackground}>
            <Icon name='ios-search' style={Styles.IconColor} />
            <Input placeholder='Search' />
          </InputGroup>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content style={Styles.Content}>
          <Button onPress={() => { this._coba() }}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default SearchBarNav
