import React, { Component } from 'react'
import { Footer, FooterTab, Icon, Button, Text } from 'native-base'

import { Actions } from 'react-native-router-flux'
import Styles from '../assets/styles/Home.styles'

const FooterNav = () => (
  <Footer>
    <FooterTab style={Styles.Footer}>
      <Button>
        <Icon name="apps" style={Styles.FooterText} />
      </Button>
      <Button onPress={Actions.AuctionDetail}>
        <Text style={Styles.FooterText}>Detail</Text>
      </Button>
      <Button onPress={Actions.Login}>
        <Text style={Styles.FooterText}>Login</Text>
      </Button>
      <Button onPress={Actions.Register}>
        <Text style={Styles.FooterText}>Register</Text>
      </Button>
    </FooterTab>
  </Footer>
)

export default FooterNav
