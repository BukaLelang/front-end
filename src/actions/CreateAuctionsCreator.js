import * as ActionTypes from './constants'

export const sendDataToCreateAuction = data => {
  return {
    type: ActionTypes.SEND_DATA_TO_CREATE_AUCTION,
    payload: data
  }
}

export const fetchDataForCreateAuction = (input, callback) => {
  return dispatch => {
    console.log('start create auction')
    fetch('http://api.bukalelang.id/auctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(result => { return result.json() })
    .then(fetchResult => {
      dispatch(sendDataToCreateAuction(fetchResult))
      callback(fetchResult)
    })
    .catch(err => { console.log(err) })
  }
}
