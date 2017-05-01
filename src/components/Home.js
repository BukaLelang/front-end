import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { View, AsyncStorage, RefreshControl } from 'react-native'
import { Container, Content, Spinner, List } from 'native-base'

import HeaderNav from './HeaderNav'
import HomeCard from './HomeCard'
import { fetchAuctions, loadAuctionById } from '../actions'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thisUser: 0,
      refreshing: false
    }
  }

  componentDidMount () {
    this.props.fetchAuctions()
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

  _onRefresh(){
    this.setState({
      refreshing:true
    })
    const self = this
    this.props.fetchAuctions()
    setTimeout(() => {
      self.setState({
        refreshing:false
      })
    }, 1000)
  }

  render () {
    return (
      <Container>
        <HeaderNav />
        <View>
          {
            this.props.auctionStatus ?
              (
                <List
                  refreshControl={
                    <RefreshControl refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}/>}
                  dataArray={this.props.auctions}
                  renderRow ={(item) => <HomeCard item={ item } onPress={() => this.routeToAuctionsDetail(item.id)} onPressToButtonLelang={() => this.routeToAuctionsDetail(item.id)} />}>
                </List>
              ) : <Spinner color='#68A57B' />
            }
        </View>
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
    fetchAuctions: () => dispatch(fetchAuctions()),
    fetchAuctionById: id => dispatch(loadAuctionById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
