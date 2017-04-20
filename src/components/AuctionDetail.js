import React, { Component } from 'react'
import moment from 'moment'
// window.navigator.userAgent = 'react-native'
// import SocketIOClient from 'socket.io-client'


import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image, TouchableOpacity, AsyncStorage, View, Alert } from 'react-native'
import { Container, Content, Card, CardItem, Button, Text, Footer, FooterTab, Icon, Header, Left, Body, Title, Spinner } from 'native-base'

import Styles from '../assets/styles/Home.styles'
import { fetchBids, fetchHistoryBids } from '../actions'
import Currency from '../helpers/currency'

class AuctionDetail extends Component {
  constructor () {
    super()
    this.state = {
      bidPrice: 0,
      nextBidData: [],
      dataUser: {}
    }

    // this.socket = SocketIOClient('http://bukalelang-backend-dev.ap-southeast-1.elasticbeanstalk.com')
  }

  componentWillMount () {
    const _this = this
    AsyncStorage.getItem('data')
    .then((keyValue) => {
      var data = JSON.parse(keyValue)
      if (data === null) {
        Actions.Login()
      } else {
        let dataInputBid = {
          userId: data.id,
          token: data.token,
          auctionId: this.props.auctionBid.id
        }
        this.setState({
          dataUser: dataInputBid
        })
        _this.props.fetchHistoryBids(dataInputBid)
      }
    })
    .catch(err => console.log(err))

    this.setState({
      bidPrice: this.props.auctionBid.current_price
    })
  }

  componentDidMount () {
    // this.socket.on('auction-' + this.props.auctionBid.id, (newBidfromOther) => {
    //   this.setState({
    //     bidPrice: newBidfromOther.current_price,
    //     nextBidData: newBidfromOther
    //   })
    // })
  }

  addBidPrice () {
    let n = this.state.bidPrice
    n += this.props.auctionBid.kelipatan_bid

    if (n > this.props.auctionBid.max_price)
    Alert.alert('Warning', 'Harga Sudah Max. Bid sekarang! Anda akan memenangkan lelang.', [{text: 'OK'}])
    else
      this.setState({
        bidPrice: n
      })
  }

  distractBidPrice () {
    let n = this.state.bidPrice
    n -= this.props.auctionBid.kelipatan_bid

    if (n <= this.props.auctionBid.current_price)
      Alert.alert('Warning', 'Harga tidak boleh lebih rendah dari harga sekarang', [{text: 'OK'}])
    else
      this.setState({
        bidPrice: n
      })
  }

  bidNow () {
    let dataInputBid = {
      userId: this.state.dataUser.userId,
      token: this.state.dataUser.token,
      auctionId: this.props.auctionBid.id,
      nextBid: this.state.bidPrice + this.props.auctionBid.kelipatan_bid
    }
    this.props.fetchBids(dataInputBid)
    // this.props.fetchHistoryBids(this.state.nextBidData)
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
            this.props.bid.length > 0 ?
            [...this.props.bid].sort( function(a,b) { return b-a }).map((item, index) => {
              return (
                <Card key={index}>
                  <CardItem>
                    <Body style={{ justifyContent: 'center'}}>
                      <Text style={{ color: '#C33149', color: '#C33149', fontWeight: 'bold', fontSize: 23, height: 25, width: '100%', textAlign: 'center' }}>Rp.{ item.bid_nominal }</Text>
                      <Button transparent textStyle={{color: '#87838B'}}>
                        <View>
                          <Text style={{ color: '#bcbcbc' }}>Bidder : { item.name_of_bidder }</Text>
                        </View>
                        <Text style={{ color: '#bcbcbc' }}>{ moment(item.bidding_time).startOf('hours').fromNow()}</Text>
                      </Button>
                    </Body>
                  </CardItem>
                </Card>
              )
            })
            :
            <Card>
              <CardItem>
                <Body style={{ justifyContent: 'center'}}>
                  <Text style={{ color: '#C33149', color: '#C33149', fontWeight: 'bold', fontSize: 23, height: 25, width: '100%', textAlign: 'center' }}>Next Bid: Rp.{ this.props.auctionBid.current_price + this.props.auctionBid.kelipatan_bid}</Text>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <View>
                      <Text style={{ color: '#bcbcbc' }}>Highest Bid : Rp.{this.props.auctionBid.current_price}</Text>
                    </View>
                    <Text style={{ color: '#bcbcbc' }}>{ moment().startOf('hours').fromNow()}</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          }
          </Content>
        <Footer style={{height: 40}}>
          <FooterTab style={{ backgroundColor: '#E29A09' }}>
            <Button danger style={{ backgroundColor: '#68A57B' }} onPress={() => this.distractBidPrice()}><Text style={{ fontSize: 25, color: 'white' }}>-</Text></Button>
            <Text style={{ color: '#932437', fontWeight: 'bold', fontSize: 22, width: '55%', textAlign: 'center', paddingTop: 4, alignItems: 'center' }}>{ this.state.bidPrice + this.props.auctionBid.kelipatan_bid }</Text>
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
    auctionBid: state.auction.auctionBid,
    bid: state.bid.bidsHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBids: (dataBid) => dispatch(fetchBids(dataBid)),
    fetchHistoryBids: (dataBid) => dispatch(fetchHistoryBids(dataBid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetail)
