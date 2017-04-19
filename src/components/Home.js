import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Image, View } from 'react-native'
import { Container, Card, CardItem, Content, Button, Text, Spinner } from 'native-base'

import Styles from '../assets/styles/Home.styles'
import HeaderNav from './HeaderNav'
import Currency from '../helpers/currency'
import { fetchAuctions, loadAuctionById } from '../actions'

class Home extends Component {
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
                      </View>
                      <View style={Styles.AuctionBox}>
                        <Text style={Styles.CurrentPrice}>Current Price: </Text>
                        <Text style={Styles.Currency}>Rp.{Currency(item.current_price)}</Text>
                      </View>
                      <Button block style={Styles.ParticipateButton} onPress={() => this.routeToAuctionsDetail(item.id)} >
                        <Text> Ikut Lelang </Text>
                      </Button>
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
