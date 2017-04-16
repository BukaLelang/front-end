import React, { Component } from 'react'
import { Container, Header, InputGroup, Input, Icon, Button } from 'native-base'

export default class Search extends Component {
  render() {
  return (
      <Container>
        <Header searchBar block>
          <InputGroup>
            <Icon name='ios-search' />
            <Input placeholder='Search' />
            <Icon name='ios-people' />
          </InputGroup>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    )
  }
}
