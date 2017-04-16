import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import App from './src/App.js'
import store from './src/store'

export default class BukaLelang extends Component {
  render () {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('BukaLelang', () => BukaLelang)
