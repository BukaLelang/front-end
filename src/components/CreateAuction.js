import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, InputGroup, Input, Text, Form, Button } from 'native-base'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { btoa } from 'Base64'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'

import { fetchDataForCreateAuction } from '../actions'
import Styles from '../assets/styles/CreateAuction.styles'
import HeaderNav from './HeaderNav'
import categoryId from '../helpers/categoryId'

// options configuration for image picker
let options = {
  title: 'Pick Picture',
  storageOptions: {
    skipBackup: true,
    path: '../images'
  }
}

const itemCondition = ['Baru', 'Bekas']
const rangeBid = ['1000', '2000', '5000', '10000', '20000', '50000', '100000']

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
      imagesIdFromBl: null,
    // for categoryId
      category: categoryId,
      categoryAfterFilter: [],
      placeholderForCategoryName: 'Pilih Kategori'
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
    this.setState({
      categoryId: event.bl_categoryId,
      categoryAfterFilter: [],
      placeholderForCategoryName: event.name
    })
  }

  _onChangeNew (event) {
    // 0 = baru, 1 = bekas
    event === 0 ? (this.setState({ new: true })) : (this.setState({ new: false }))
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

  _onChangeKelipatanBid (idx, value) {
    this.setState({ kelipatan_bid: Number(value) })
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
    this.props.fetchDataForCreateAuction(input)
    Actions.Home()
  }

  _filterSearchCategory (event) {
    let checkCategory = (data) => {
      var pattern = new RegExp(event.nativeEvent.text, 'gi')
      if (pattern.test(data.name)) {
        return true
      }
    }

    event.nativeEvent.text.length !== 0 ? (
      this.setState({categoryAfterFilter: this.state.category.filter(checkCategory)})
    ) : (
      this.setState({categoryAfterFilter: []})
    )
  }

  render () {
    return (
      <Container>
        <HeaderNav />
        <Content style={Styles.Container}>
          <Form>
            {/* PILIH GAMBAR */}
            <Button block style={Styles.UploadPictureButton} onPress={() => { this._uploadPicture() }}>
              <Text>Pilih Gambar</Text>
            </Button>

            {/* TITLE */}
            <InputGroup regular>
              <Input placeholder='Title' onChange={(event) => { this._onChangeTitle(event) }} />
            </InputGroup>

            {/* KATEGORI ID */}
            <InputGroup regular>
              <Input placeholder={this.state.placeholderForCategoryName} onChange={(event) => { this._filterSearchCategory(event) }} />
            </InputGroup>

            <ScrollView>
              { this.state.categoryAfterFilter.map((newsItem, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => { this._onChangeCategoryId(newsItem) }} >
                    <Text> {newsItem.name} </Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

            {/* KONDISI BARANG */}
            <Text>Kondisi barang: </Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <ModalDropdown style={styles.dropdown} options={itemCondition} onSelect={(value) => this._onChangeNew(value)} />
                </View>
              </View>
            </View>

            {/* KELIPATAN BID */}
            <Text>Kelipatan Bid: </Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <ModalDropdown style={{ width: 200 }} options={rangeBid} onSelect={(idx, value) => this._onChangeKelipatanBid(idx, value)} />
                </View>
              </View>
            </View>

            {/* PERKIRAAN BERAT */}
            <InputGroup regular>
              <Input placeholder='Perkiraan berat' keyboardType={'numeric'} onChange={(event) => { this._onChangeWeight(event) }} />
            </InputGroup>

            {/* DESKRIPSI BARANG */}
            <InputGroup regular>
              <Input placeholder='Description' onChange={(event) => { this._onChangeDescription(event) }} />
            </InputGroup>

            {/* MIN PRICE */}
            <InputGroup regular>
              <Input placeholder='Min. Price' keyboardType={'numeric'} onChange={(event) => { this._onChangeMinPrice(event) }} />
            </InputGroup>

            {/* MAX PRICE */}
            <InputGroup regular>
              <Input placeholder='Max. Price' keyboardType={'numeric'} onChange={(event) => { this._onChangeMaxPrice(event) }} />
            </InputGroup>

            {/* DATE END BID */}
            <DatePicker
              style={{width: '100%'}}
              date={this.state.end_date}
              mode='datetime'
              format='YYYY-MM-DD HH:mm'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{ dateIcon: { position: 'absolute', right: 0, top: 0, marginTop: 5 }}}
              minuteInterval={10}
              onDateChange={(datetime) => { this.setState({end_date: datetime}) }}
            />

            {/* SUBMIT */}
            <Button block style={Styles.CreateAuctionButton} onPress={() => { this._sendData() }} >
              <Text>Bikin Lelang</Text>
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
    fetchDataForCreateAuction: (input) => { dispatch(fetchDataForCreateAuction(input)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuction)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 40
  },
  cell: {
    flex: 1,
    width: 80,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth
  },
  dropdown: {
    flex: 1,
    width: '100%'
  }
})
