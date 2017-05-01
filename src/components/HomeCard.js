import React from 'react'
import { View, Image } from 'react-native'
import { Card, CardItem, Spinner, Button, Text } from 'native-base'

import Styles from '../assets/styles/Home.styles'
import Currency from '../helpers/currency'

const HomeCard = (props) => {
  console.log('Ini dari props : ',props.thisUser);
  return (
    <Card>
      <CardItem cardBody>
        <Image source={{ uri: props.item.images }} style={Styles.ImageAuction}>
          <View style={Styles.Badge}><Text style={Styles.BadgeTitle}>{ props.item.new ? 'BARU' : 'BEKAS' }</Text></View>
        </Image>
      </CardItem>
      <View content style={Styles.AuctionBox}>
        <Text style={Styles.Title}>{ props.item.title }</Text>
      </View>
      <View style={Styles.DescriptionBox}>
        <Text style={Styles.DescriptionTitle}>Deskripsi</Text>
        <Text style={Styles.DescriptionContent}>{ props.item.description }</Text>
        <Text style={Styles.DescriptionTitle}></Text>
        <Text style={Styles.DescriptionTitle}>Pelelang: { props.item.name }</Text>
        <Text style={Styles.DescriptionContent}>Harga Maksimal: { props.item.max_price }</Text>
      </View>
      <View style={Styles.AuctionBox}>
        <Text style={Styles.CurrentPrice}>Current Price: </Text>
        <Text style={Styles.Currency}>Rp.{Currency(props.item.current_price)}</Text>
      </View>
      { (props.thisUser === props.item.userId) ?
        <Button block style={Styles.ParticipateButtonSelf} onPress={ props.onPress } >
          <Text> Lihat Perkembangan Lelang Anda</Text>
        </Button>
        :
        <Button block style={Styles.ParticipateButton} onPress={ props.onPressToButtonLelang } >
          <Text> Ikut Lelang </Text>
        </Button>
      }
    </Card>
  )
}

export default HomeCard
