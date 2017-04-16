import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import { Container, Content, InputGroup, Input, Text, Form, Button } from 'native-base'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

import * as ActionTypes from '../actions/constant.js'
// import { SendDataForLogin } from '../helpers/fetchData.js'

import HeaderNav from './HeaderNav'

let options = {
  title: 'Pick Picture',
  storageOptions: {
    skipBackup: true,
    path: '../images'
  }
}

class CreateAuction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: {
        bukalapakId: null,
        email: null,
        id: null,
        message: null,
        name: null,
        saldo: null,
        success: null,
        token: null,
        username: null
      },
      dataItem: {
        title: null,
        categoryId: null,
        new: null,
        weight: null,
        description: null,
        min_price: null,
        max_price: null,
        kelipatan_bid: null,
        end_date: null
      },
      imagesId: null
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('data').then((keyValue) => {
      let tempData = JSON.parse(keyValue)
      // console.log(tempData.dataUser)
      this.setState({
        dataUser: {
          bukalapakId: tempData.dataUser.bukalapakId,
          email: tempData.dataUser.email,
          id: tempData.dataUser.id,
          message: tempData.dataUser.message,
          name: tempData.dataUser.name,
          saldo: tempData.dataUser.saldo,
          success: tempData.dataUser.success,
          token: tempData.dataUser.token,
          username: tempData.dataUser.username
        }})
    })
  }

  componentWillMount () {
    Actions.refresh({key: 'MenuDrawer', open: value => !value})
  }

  _onChangeTitle (event) {
    this.setState({
      dataItem: {
        title: event.nativeEvent.text,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeCategoryId (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: event.nativeEvent.text,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeNew (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: event.nativeEvent.text,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeWeight (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: event.nativeEvent.text,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeDescription (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: event.nativeEvent.text,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeMinPrice (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: event.nativeEvent.text,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeMaxPrice (event) {
    console.log(event.nativeEvent.max_price)
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: event.nativeEvent.text,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeKelipatanBid (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: event.nativeEvent.text,
        end_date: this.state.dataItem.end_date
      }
    })
  }

  _onChangeEndDate (event) {
    this.setState({
      dataItem: {
        title: this.state.dataItem.title,
        categoryId: this.state.dataItem.categoryId,
        new: this.state.dataItem.new,
        weight: this.state.dataItem.weight,
        description: this.state.dataItem.description,
        min_price: this.state.dataItem.min_price,
        max_price: this.state.dataItem.max_price,
        kelipatan_bid: this.state.dataItem.kelipatan_bid,
        end_date: event.nativeEvent.text
      }
    })
  }

  _uploadPicture () {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else {
        let source = { image: response.uri }
        console.log(source)
        this.setState({imagesId: source})
      }
    })
  }

  _sendData () {
    let blEndPoint = 'https://api.bukalapak.com/v2/images.json'
    let username = this.state.dataUser.bukalapakId
    let password = this.state.dataUser.token
    let url = 'https://' + username + ':' + password + '@api.bukalapak.com/v2/images.json'
    let formData = {
      file: this.state.imagesId
    }
    const file = {
      url: this.state.imagesId.image,
      name: 'test.jpg',
      type: 'image/jpg'
    }
    let body = new FormData()
    body.append('file', file)
    console.log(body)
    fetch(blEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      },
      body: body
    })
    .then(result => {
      return result.json()
    })
    .then(fetchResult => {
      console.log(fetchResult)
    })
  }

  render () {
    return (
      <Container>
        <Text>{JSON.stringify(this.state.dataUser)}</Text>
        <HeaderNav />
        <Content>
          <Form>
            <InputGroup regular>
              <Input placeholder='Title' onChange={(event) => { this._onChangeTitle(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Kategori id' onChange={(event) => { this._onChangeCategoryId(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='New' onChange={(event) => { this._onChangeNew(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Weight (kg)' onChange={(event) => { this._onChangeWeight(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Description' onChange={(event) => { this._onChangeDescription(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Min. Price' onChange={(event) => { this._onChangeMinPrice(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Max. Price' onChange={(event) => { this._onChangeMaxPrice(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='Kelipatan Bidding' onChange={(event) => { this._onChangeKelipatanBid(event) }} />
            </InputGroup>
            <InputGroup regular>
              <Input placeholder='end date' onChange={(event) => { this._onChangeEndDate(event) }} />
            </InputGroup>
            <Button onPress={() => { this._uploadPicture() }}>
              <Text>Pilih Gambar</Text>
            </Button>
            <Button block onPress={() => { this._sendData() }} >
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
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
    sendDataToCreateAuction: (data) => dispatch({
      type: ActionTypes.SEND_DATA_TO_CREATE_AUCTION,
      payload: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuction)
