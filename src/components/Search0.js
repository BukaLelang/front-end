import React, { Component } from 'react'
import { Container, Content, Header, InputGroup, Input, Icon, Button, Text } from 'native-base'

import Styles from '../assets/styles/Search.styles'

class SearchBarNav extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded style={Styles.Header}>
          <InputGroup regular style={Styles.InputGroupBackground}>
            <Icon name="ios-search" style={Styles.IconColor} />
            <Input placeholder="Search" />
          </InputGroup>
            <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content style={Styles.Content}>
          <Button style={Styles.BackButton}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default SearchBarNav
