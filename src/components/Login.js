import React, { Component } from 'react'
import { AsyncStorage, Alert, Image } from 'react-native'
import { Container, Content, Form, Input, Button, Text, InputGroup, Footer, FooterTab, Spinner, Icon, Item, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchDataForLogin } from '../actions'
import Styles from '../assets/styles/Login.styles'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: null
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
    this.setState({loading: true})
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
        this.setState({loading: null}),
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
            {/* USERNAME */}
            <InputGroup success>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChange={(event) => { this._onChangeInputUsername(event) }} />
              </Item>
            </InputGroup>

            {/* PASSWORD */}
            <InputGroup success>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input type='password' secureTextEntry onChange={(event) => { this._onChangeInputPassword(event) }} />
              </Item>
            </InputGroup>

            {/* LOGIN BUTTON */}
            { this.state.loading ? (
              <Spinner color='#68A57B' />
            ) : (
              <Button block style={Styles.LoginButton} onPress={() => { this._sendData() }} >
                <Text>Login</Text>
              </Button>
            ) }
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
