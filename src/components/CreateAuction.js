import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import { Container, Content, InputGroup, Input, Text, Form, Button } from 'native-base'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { btoa } from 'Base64'

import { fetchDataForCreateAuction } from '../actions'
import HeaderNav from './HeaderNav'

// options configuration for image picker
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
    // for dataUser state
      bukalapakId: null,
      email: null,
      id: null,
      message: null,
      name: null,
      saldo: null,
      success: null,
      token: null,
      username: null,
    // for dataItem state
      title: null,
      categoryId: null,
      new: null,
      weight: null,
      description: null,
      min_price: null,
      max_price: null,
      kelipatan_bid: null,
      end_date: null,
    // for image state
      imagesId: null,
      imagesIdFromBl: null
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('data').then((keyValue) => {
      let tempData = JSON.parse(keyValue)
      this.setState({
        bukalapakId: tempData.bukalapakId,
        email: tempData.email,
        id: tempData.id,
        message: tempData.message,
        name: tempData.name,
        saldo: tempData.saldo,
        success: tempData.success,
        token: tempData.token,
        username: tempData.username
      })
    })
  }

  componentWillMount () {
    Actions.refresh({key: 'MenuDrawer', open: value => !value})
  }

  _onChangeTitle (event) {
    this.setState({ title: event.nativeEvent.text })
  }

  _onChangeCategoryId (event) {
    this.setState({ categoryId: event.nativeEvent.text })
  }

  _onChangeNew (event) {
    this.setState({ new: event.nativeEvent.text })
  }

  _onChangeWeight (event) {
    this.setState({ weight: event.nativeEvent.text })
  }

  _onChangeDescription (event) {
    this.setState({ description: event.nativeEvent.text })
  }

  _onChangeMinPrice (event) {
    this.setState({ min_price: event.nativeEvent.text })
  }

  _onChangeMaxPrice (event) {
    this.setState({ max_price: event.nativeEvent.text })
  }

  _onChangeKelipatanBid (event) {
    this.setState({ kelipatan_bid: event.nativeEvent.text })
  }

  _onChangeEndDate (event) {
    this.setState({ end_date: event.nativeEvent.text })
  }

  _uploadPicture () {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) console.log('User cancelled image picker')
      else if (response.error) console.log('ImagePicker Error: ', response.error)
      else {
        let source = { image: response.uri }
        this.setState({imagesId: source})

        let blEndPoint = 'https://api.bukalapak.com/v2/images.json'
        let username = this.state.bukalapakId
        let password = this.state.token

        let data = new FormData()
        data.append('file', {
          uri: this.state.imagesId.image,
          name: 'picture.jpg',
          type: 'image/jpg'
        })
        const encodedName = btoa(username + ':' + password)
        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;',
            'Authorization': 'Basic ' + encodedName
          },
          body: data
        }

        console.log('start fetch process')
        const self = this
        fetch(blEndPoint, config)
        .then(function (response) {
          let responseResult = Promise.resolve(response.json())
          console.log(responseResult)
          responseResult.then(function (data) {
            self.setState({ imagesIdFromBl: data.id })
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  }

  _sendData () {
    let input = {
      userId: this.state.id,
      bukalapakId: this.state.bukalapakId,
      token: this.state.token,
      title: this.state.title,
      categoryId: this.state.categoryId,
      new: this.state.new,
      weight: this.state.weight,
      description: this.state.description,
      min_price: this.state.min_price,
      max_price: this.state.max_price,
      kelipatan_bid: this.state.kelipatan_bid,
      imagesId: this.state.imagesIdFromBl,
      end_date: this.state.end_date
    }

    let callback = (dataResultAfterFetch) => {
      console.log(dataResultAfterFetch)
    }

    this.props.fetchDataForCreateAuction(input, callback)
  }

  render () {
    return (
      <Container>
        <Text>{JSON.stringify(this.state)}</Text>
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
    createAuctions: state.createAuctions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataForCreateAuction: (input, callback) => { fetchDataForCreateAuction(input, callback) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuction)
