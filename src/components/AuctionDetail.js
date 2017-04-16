import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, TouchableOpacity } from 'react-native'
import { Container, Content, Button, Text, Footer, FooterTab, Icon, Header, Left, Body, Title } from 'native-base'

import HeaderNav from './HeaderNav'
import Styles from '../assets/styles/Home.styles'

class AuctionDetail extends Component {
  constructor () {
    super()
    this.state = {
      bidPrice: 0
    }
  }

  componentWillMount () {
    Actions.currentRouter = null
  }

  render () {
    return (
      <Container>
        <Header style={Styles.Header}>
          <Left>
            <Button transparent style={Styles.BurgerMenu}>
            <Icon name='arrow-back' onPress={Actions.Home} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.Logo}>BukaLelang</Title>
          </Body>
          <Body>
            <TouchableOpacity style={Styles.TouchSearch} onPress={Actions.Search }>
              <Icon name='ios-search' style={Styles.Search}/>
            </TouchableOpacity>
          </Body>
        </Header>
        <Image source={{ uri: 'http://4.bp.blogspot.com/-IgOZa3Gm5Qc/VecNGI-7NJI/AAAAAAAAAk0/0bg1FVdAfes/s1600/Foto-Isyana-Sarasvati-01.jpg' }} style={{width: '100%', height: '71%' }}>
        </Image>
        <Footer style={{ height: 40}}>
          <FooterTab style={{ backgroundColor: '#E29A09' }}>
          </FooterTab>
        </Footer>
        <Footer>
          <FooterTab style={Styles.Footer}>
            <Button>
              <Text style={Styles.FooterText}>Bid Now!</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default AuctionDetail
