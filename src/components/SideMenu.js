import React, { Component } from 'react'
import { AsyncStorage, Alert, View } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

import Styles from '../assets/styles/Home.styles'

export default class SideMenu extends Component {
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
        <View style={{width: '100%', height: 250, backgroundColor: '#589CEF'}}>
        </View>
        <Content>
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.CreateAuction}>
            <Text style={Styles.TextMenu}>Bikin Lelang</Text>
          </Button>
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.MyAuctions}>
            <Text style={Styles.TextMenu}>Lapak Saya</Text>
          </Button>
          <Button transparent style={Styles.ListMenuSideBar} onPress={Actions.JoinedAuctions}>
            <Text style={Styles.TextMenu}>Ikut Lelang</Text>
          </Button>
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
