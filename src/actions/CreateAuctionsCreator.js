import * as ActionTypes from './constants'

export const sendDataToCreateAuction = data => {
  return {
    type: ActionTypes.SEND_DATA_TO_CREATE_AUCTION,
    payload: data
  }
}

export const loadAuctionById = id => {
  return {
    type: ActionTypes.LOAD_AUCTION_BY_ID,
    payload: id
  }
}

export const fetchDataForCreateAuction = (input) => {
  return dispatch => {
    fetch('http://api.bukalelang.id/auctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(result => { return result.json() })
    .then(fetchResult => {
      console.log(fetchResult)
      console.log('Auction berhasil dibuat')
      dispatch(sendDataToCreateAuction(fetchResult))
    })
    .catch(err => { console.log(err) })
  }
}
