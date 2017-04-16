import React, { Component } from 'react'
import { Image, Alert, AsyncStorage } from 'react-native'
import { Container, Content, Form, Input, Button, Text, InputGroup, H1, Footer, FooterTab } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Styles from '../assets/styles/Login.styles'
import * as ActionTypes from '../actions/constant.js'
import { SendDataForRegister } from '../helpers/fetchData.js'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      register: {
        name: '',
        email: '',
        username: '',
        password: ''
      },
      message: ''
    }
  }

  _onChangeInputName (event) {
    this.setState({
      register: {
        name: event.nativeEvent.text,
        email: this.state.register.email,
        username: this.state.register.username,
        password: this.state.register.password
      }
    })
  }

  _onChangeInputEmail (event) {
    this.setState({
      register: {
        name: this.state.register.name,
        email: event.nativeEvent.text,
        username: this.state.register.username,
        password: this.state.register.password
      }
    })
  }

  _onChangeInputUsername (event) {
    this.setState({
      register: {
        name: this.state.register.name,
        email: this.state.register.email,
        username: event.nativeEvent.text,
        password: this.state.register.password
      }
    })
  }

  _onChangeInputPassword (event) {
    this.setState({
      register: {
        name: this.state.register.name,
        email: this.state.register.email,
        username: this.state.register.username,
        password: event.nativeEvent.text
      }
    })
  }

  _sendData () {
    let callback = (resultDataAfterFetch) => {
      this.props.sendDataToRegister(resultDataAfterFetch)
      if (resultDataAfterFetch.message !== 'login success') {
        Alert.alert(resultDataAfterFetch.message)
      } else {
        AsyncStorage.setItem('data', JSON.stringify(this.props.login))
        Actions.MenuDrawer()
      }
    }

    SendDataForRegister(this.state.register, callback)
  }

  componentDidMount () {
  }

  render () {
    return (
      <Container>
        <Text> {`message: ` + JSON.stringify(this.props.register.dataUser.message)} </Text>
        <Content style={Styles.Container}>
          <Form>
            <H1 style={Styles.Logo}>BukaLelang</H1>
            <InputGroup regular>
              <Input placeholder='Nama Lengkap' onChange={(event) => { this._onChangeInputName(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Email' onChange={(event) => { this._onChangeInputEmail(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Username' onChange={(event) => { this._onChangeInputUsername(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Password' type='password' onChange={(event) => { this._onChangeInputPassword(event) }} />
            </InputGroup>
            <Button block style={Styles.LoginButton} onPress={() => { this._sendData() }} >
              <Text>Daftar</Text>
            </Button>
            <Text style={Styles.OrStyle}>OR</Text>
            <Button block style={Styles.FacebookButton}>
              <Image source={require('../assets/images/fb-logo.png')} style={Styles.IconImage} />
              <Text style={Styles.TextButton}>Daftar dengan Facebook</Text>
            </Button>
            <Button block style={Styles.GoogleButton}>
              <Image source={require('../assets/images/google-logo.png')} style={Styles.IconImage} />
              <Text style={Styles.TextButton}>Daftar dengan Google</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab style={Styles.Footer}>
            <Button full onPress={Actions.Login}>
              <Text>Sudah Punya Akun? Masuk</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    register: state.register
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendDataToRegister: (data) => dispatch({
      type: ActionTypes.SEND_DATA_TO_REGISTER,
      payload: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
