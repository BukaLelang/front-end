import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Image, View, AsyncStorage } from 'react-native'
import { Container, Card, CardItem, Content, Button, Text, Spinner } from 'native-base'

import Styles from '../assets/styles/Home.styles'
import HeaderNav from './HeaderNav'
import Currency from '../helpers/currency'
import { fetchAuctions, loadAuctionById } from '../actions'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      thisUser: 0
    }
  }

  componentDidMount () {
    const _this = this
    AsyncStorage.getItem('data')
    .then((keyValue) => {
      var data = JSON.parse(keyValue)
      this.setState({
        thisUser: data.id
      })
    })
    .catch(err => console.log(err))
  }

  routeToAuctionsDetail (id) {
    this.props.fetchAuctionById(id)
    Actions.AuctionDetail()
  }

  render () {
    return (
      <Container>
        <HeaderNav />
        <Content>
          {
            this.props.auctionStatus ?
                this.props.auctions.map((item, index) => {
                  return (
                    <Card key={index}>
                      <CardItem cardBody>
                        <Image source={{ uri: item.images }} style={Styles.ImageAuction}>
                          <View style={Styles.Badge}><Text style={Styles.BadgeTitle}>{ item.new ? 'BARU' : 'BEKAS' }</Text></View>
                        </Image>
                      </CardItem>
                      <View content style={Styles.AuctionBox}>
                        <Text style={Styles.Title}>{item.title}</Text>
                      </View>
                      <View style={Styles.DescriptionBox}>
                        <Text style={Styles.DescriptionTitle}>Deskripsi</Text>
                        <Text style={Styles.DescriptionContent}>{item.description}</Text>
                        <Text style={Styles.DescriptionTitle}></Text>
                        <Text style={Styles.DescriptionTitle}>Pelelang: {item.name}</Text>
                        <Text style={Styles.DescriptionContent}>Harga Maksimal:  {item.max_price}</Text>
                      </View>
                      <View style={Styles.AuctionBox}>
                        <Text style={Styles.CurrentPrice}>Current Price: </Text>
                        <Text style={Styles.Currency}>Rp.{Currency(item.current_price)}</Text>
                      </View>
                      { (this.state.thisUser === item.userId) ?
                        <Button block style={Styles.ParticipateButtonSelf} onPress={() => this.routeToAuctionsDetail(item.id)} >
                          <Text> Lihat Perkembangan Lelang Anda</Text>
                        </Button>
                        :
                        <Button block style={Styles.ParticipateButton} onPress={() => this.routeToAuctionsDetail(item.id)} >
                          <Text> Ikut Lelang </Text>
                        </Button>
                      }
                    </Card>
                  )
                })
               :
                <Spinner color='#68A57B' />
            }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auctions: state.auction.listAuctions.auctions,
    auctionStatus: state.auction.listAuctions.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAuctions: dispatch(fetchAuctions()),
    fetchAuctionById: id => dispatch(loadAuctionById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
