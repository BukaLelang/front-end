import React, { Component } from 'react'
import { Image, AsyncStorage, Alert } from 'react-native'
import { Container, Content, Form, Input, Button, Text, InputGroup, H1, Footer, FooterTab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Styles from '../assets/styles/Login.styles'
import * as ActionTypes from '../actions/constant.js'
import { SendDataForLogin } from '../helpers/fetchData.js'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: {
        username: '',
        password: ''
      },
      anmating: true
    }
  }

  componentDidMount () {
    this._checkAsync()
  }

  _checkAsync () {
    AsyncStorage.getItem('data').then((keyValue) => {
      var data = JSON.parse(keyValue)
      if (data.dataUser.token) {
        Actions.MenuDrawer()
      }
    }, (error) => {
      console.log(error)
    })
  }

  _onChangeInputUsername (event) {
    this.setState({
      login: {
        username: event.nativeEvent.text,
        password: this.state.login.password
      }
    })
  }

  _onChangeInputPassword (event) {
    this.setState({
      login: {
        username: this.state.login.username,
        password: event.nativeEvent.text
      }
    })
  }

  _sendData () {
    let callback = (resultDataAfterFetch) => {
      if (resultDataAfterFetch.token) {
        this.props.sendDataToLogin(resultDataAfterFetch)
        AsyncStorage.setItem('data', JSON.stringify(this.props.login))
        Actions.Home()
      } else {
        Alert.alert('Username atau password anda salah')
      }
    }
    SendDataForLogin(this.state.login, callback)
  }

  render () {
    return (
      <Container>
        <Content style={Styles.Container}>
          <Form>
            <H1 style={Styles.Logo}>BukaLelang</H1>
            <InputGroup regular>
              <Input placeholder='Username' onChange={(event) => { this._onChangeInputUsername(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Password' type='password' onChange={(event) => { this._onChangeInputPassword(event) }} />
            </InputGroup>
            <Button block style={Styles.LoginButton} onPress={() => { this._sendData() }} >
              <Text>Login</Text>
            </Button>
            <Text style={Styles.OrStyle}>OR</Text>
            <Button block style={Styles.FacebookButton}>
              <Image source={require('../assets/images/fb-logo.png')} style={Styles.IconImage} />
              <Text style={Styles.TextButton}>Login dengan Facebook</Text>
            </Button>
            <Button block style={Styles.GoogleButton}>
              <Image source={require('../assets/images/google-logo.png')} style={Styles.IconImage} />
              <Text style={Styles.TextButton}>Login dengan Google</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab style={Styles.Footer}>
            <Button full onPress={Actions.Register}>
              <Text>Belum Punya Akun? Daftar Sekarang</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendDataToLogin: (data) => dispatch({
      type: ActionTypes.SEND_DATA_TO_LOGIN,
      payload: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
