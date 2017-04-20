import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Image, View, AsyncStorage } from 'react-native'
import { Container, Card, CardItem, Content, Button, Text, Spinner } from 'native-base'

import Styles from '../assets/styles/Home.styles'
import HeaderNav from './HeaderNav'
import Currency from '../helpers/currency'
import { fetchDataForGetJoinedAuctionsData } from '../actions'

class JoinedAuctions extends Component {
  constructor (props) {
    super(props)
    this.state = {
    // for dataUser state
      bukalapakId: null,
      email: null,
      id: null,
      message: null,
      name: null,
      saldo: null,
      success: null,
      token: null,
      username: null,
      data: []
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('data').then((keyValue) => {
      let tempData = JSON.parse(keyValue)
      this.props.fetchDataForGetJoinedAuctionsData(tempData)
      this.setState({
        bukalapakId: tempData.bukalapakId,
        email: tempData.email,
        id: tempData.id,
        message: tempData.message,
        name: tempData.name,
        saldo: tempData.saldo,
        success: tempData.success,
        token: tempData.token,
        username: tempData.username
      })
      this.props.joinedAuctions.joinedBid.length == null ? console.log('masih kosong') : this.setState({data: this.props.joinedAuctions.joinedBid})
    })
  }

  render () {
    console.log(JSON.stringify(this.props.joinedAuctions.joinedBid))
    return (
      <Container>
        <HeaderNav />
        <Content>
          {
            this.props.joinedAuctions.joinedBid.length !== 0
              ?
                this.props.joinedAuctions.joinedBid.map((item, index) => {
                  return (
                    <Card key={index}>
                      <CardItem cardBody>
                        <Image source={{ uri: item.images }} style={Styles.ImageAuction}>
                          <View style={Styles.Badge}><Text style={Styles.BadgeTitle}>{ item.running ? 'TERSEDIA' : 'LAKU' }</Text></View>
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
                        <Text style={Styles.Currency}>Rp.{Currency(item.current_bid)}</Text>
                      </View>
                    </Card>
                  )
                })
              : <Spinner color='#68A57B' />
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    joinedAuctions: state.joinedAuctions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataForGetJoinedAuctionsData: (input) => { dispatch(fetchDataForGetJoinedAuctionsData(input)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinedAuctions)
