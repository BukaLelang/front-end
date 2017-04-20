import React, { Component } from 'react'
import { AsyncStorage, Alert, View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

import Styles from '../assets/styles/Home.styles'

export default class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: {}
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('data').then((keyValue) => {
      let tempData = JSON.parse(keyValue)
      this.setState({dataUser: tempData})
    })
  }

  _logout () {
    AsyncStorage.removeItem('data', error => {
      if (error) {
        console.log(error)
      } else {
        Alert.alert('Anda sudah logout')
        Actions.refresh({key: 'MenuDrawer', open: value => false})
        Actions.Login()
      }
    })
  }

  render () {
    return (
      <Container>
        <View style={{width: '100%', height: 250, backgroundColor: '#589CEF'}} >
        </View>
        <Content>


          {/* BIKIN LELANG */}
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.CreateAuction}>
            <Text style={Styles.TextMenu}>Bikin Lelang</Text>
          </Button>

          {/* LAPAK SAYA */}
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.MyAuctions}>
            <Text style={Styles.TextMenu}>Lapak Saya</Text>
          </Button>

          {/* IKUT LELANG */}
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.JoinedAuctions}>
            <Text style={Styles.TextMenu}>Ikut Lelang</Text>
          </Button>

          {/* MENANG LELANG */}
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.WonAuctions}>
            <Text style={Styles.TextMenu}>Menang Lelang</Text>
          </Button>
          <Button block style={Styles.LogoutButton} onPress={() => { this._logout() }}>
            <Text style={Styles.LogoutText}>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
