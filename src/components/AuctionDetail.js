import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image, TouchableOpacity } from 'react-native'
import { Container, Content, Card, CardItem, Button, Text, Footer, FooterTab, Icon, Header, Left, Body, Title } from 'native-base'

import Styles from '../assets/styles/Home.styles'

class AuctionDetail extends Component {
  constructor () {
    super()
    this.state = {
      bidPrice: 0,
      arrBid: []
    }
  }

  componentWillMount () {
    this.setState({
      bidPrice: this.props.auctionBid.current_price
    })
  }

  addBidPrice () {
    let n = this.state.bidPrice
    n += this.props.auctionBid.kelipatan_bid
    this.setState({
      bidPrice: n
    })
  }

  distractBidPrice () {
    let n = this.state.bidPrice
    n -= this.props.auctionBid.kelipatan_bid
    this.setState({
      bidPrice: n
    })
  }

  bidNow () {
    this.setState({
      arrBid: this.state.arrBid.concat([this.state.bidPrice])
    })
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
            <TouchableOpacity style={Styles.TouchSearch} onPress={Actions.Search}>
              <Icon name='ios-search' style={Styles.Search} />
            </TouchableOpacity>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image style={{ resizeMode: 'cover', height: 250, width: '100%' }} source={{ uri: this.props.auctionBid.images }} />
            </CardItem>
          </Card>
          {
            this.state.arrBid.map((item, index) => {
              return (
                <Card key={index}>
                  <CardItem>
                    <Body>
                      <Text>{ item }</Text>
                      <Button transparent textStyle={{color: '#87838B'}}>
                        <Text>Highest Bid</Text>
                        <Text>11 hours ago</Text>
                      </Button>
                    </Body>
                  </CardItem>
                </Card>
              )
            })
          }
        </Content>
        <Footer style={{height: 40}}>
          <FooterTab style={{ backgroundColor: '#E29A09' }}>
            <Button danger style={{ backgroundColor: '#68A57B' }} onPress={() => this.distractBidPrice()}><Text style={{ fontSize: 25, color: 'white' }}>-</Text></Button>
            <Text style={{ color: '#932437', fontWeight: 'bold', fontSize: 22, width: '55%', textAlign: 'center', paddingTop: 4, alignItems: 'center' }}>{ this.state.bidPrice }</Text>
            <Button danger style={{ backgroundColor: '#68A57B' }} onPress={() => this.addBidPrice()}><Text style={{ fontSize: 25, color: 'white' }}>+</Text></Button>
          </FooterTab>
        </Footer>
        <Footer>
          <FooterTab style={Styles.Footer}>
            <Button onPress={() => this.bidNow()}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>BID NOW</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auctionBid: state.auction.auctionBid
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetail)
