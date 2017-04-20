import React, { Component } from 'react'
import { AsyncStorage, Alert, Image } from 'react-native'
import { Container, Content, Form, Input, Button, Text, InputGroup, H1, Footer, FooterTab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchDataForLogin } from '../actions'
import Styles from '../assets/styles/Login.styles'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('data').then((keyValue) => {
      var data = JSON.parse(keyValue)
      data !== null ? (
        console.log('AsyncStorage sudah terisi'),
        Actions.Home()
      ) : (
        console.log('AsyncStorage masih kosong')
      )
    }, (error) => {
      console.log(error)
    })
  }

  _onChangeInputUsername (event) {
    this.setState({ username: event.nativeEvent.text })
  }

  _onChangeInputPassword (event) {
    this.setState({ password: event.nativeEvent.text })
  }

  _sendData () {
    let input = {
      username: this.state.username,
      password: this.state.password
    }

    let callback = (dataResultAfterFetch) => {
      dataResultAfterFetch.success === true ? (
        console.log('proses login berhasil'),
        AsyncStorage.setItem('data', JSON.stringify(dataResultAfterFetch)),
        Actions.Home()
      ) : (
        Alert.alert(dataResultAfterFetch.message)
      )
    }
    this.props.fetchDataForLogin(input, callback)
  }

  render () {
    return (
      <Container>
        <Content style={Styles.Container}>
          <Image source={require('../assets/images/bukalelang-banner-versi-reverse.png')} style={{ width: 250, height: 200, resizeMode: 'contain', marginLeft: 15 }} />
          <Form>
            <InputGroup regular>
              <Input placeholder='Username' onChange={(event) => { this._onChangeInputUsername(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Password' secureTextEntry={true} type='password' onChange={(event) => { this._onChangeInputPassword(event) }} />
            </InputGroup>
            <Button block style={Styles.LoginButton} onPress={() => { this._sendData() }} >
              <Text>Login</Text>
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
    fetchDataForLogin: (input, callback) => dispatch(fetchDataForLogin(input, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
