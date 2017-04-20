import React, { Component } from 'react'
import { Alert, AsyncStorage, Image } from 'react-native'
import { Container, Content, Form, Input, Button, Text, InputGroup, Footer, FooterTab, Spinner, Item, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { fetchDataForRegister } from '../actions'
import Styles from '../assets/styles/Login.styles'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      message: '',
      loading: null
    }
  }

  _onChangeInputName (event) {
    this.setState({name: event.nativeEvent.text})
  }

  _onChangeInputEmail (event) {
    this.setState({ email: event.nativeEvent.text })
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
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }

    let callback = (dataResultAfterFetch) => {
      dataResultAfterFetch.success === true ? (
        console.log('proses register berhasil'),
        AsyncStorage.setItem('data', JSON.stringify(dataResultAfterFetch)),
        Actions.Home()
      ) : (
        this.setState({loading: null}),
        Alert.alert(dataResultAfterFetch.message)
      )
    }
    this.props.fetchDataForRegister(input, callback)
  }

  render () {
    return (
      <Container>
        <Content style={Styles.Container}>
          <Image source={require('../assets/images/bukalelang-banner-versi-reverse.png')} style={{ width: 250, height: 200, resizeMode: 'contain', marginLeft: 15 }} />
          <Form>
            {/* NAMA LENGKAP */}
            <InputGroup success>
              <Item floatingLabel>
                <Label>Nama Lengkap</Label>
                <Input onChange={(event) => { this._onChangeInputName(event) }} />
              </Item>
            </InputGroup>

            {/* EMAIL */}
            <InputGroup success>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChange={(event) => { this._onChangeInputEmail(event) }} />
              </Item>
            </InputGroup>

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
                <Input secureTextEntry type='password' onChange={(event) => { this._onChangeInputPassword(event) }} />
              </Item>
            </InputGroup>

            {/* LOGIN BUTTON */}
            { this.state.loading ? (
              <Spinner color='#68A57B' />
            ) : (
              <Button block style={Styles.LoginButton} onPress={() => { this._sendData() }} >
                <Text>Daftar</Text>
              </Button>
            ) }

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
    fetchDataForRegister: (inputData, callback) => dispatch(fetchDataForRegister(inputData, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
