import axios from 'axios'
import * as ActionTypes from './constants'

export const loadBids = data => {
  return {
    type: ActionTypes.LOAD_BIDS,
    payload: data
  }
}

export const loadHistoryBids = data => {
  return {
    type: ActionTypes.LOAD_HISTORY_BIDS,
    payload: data
  }
}

export const fetchBids = dataBid => {
  return dispatch => {
    axios.post('http://api.bukalelang.id/bids', { auctionId: dataBid.auctionId, nextBid: dataBid.nextBid }, {headers: { userid: dataBid.userId, token: dataBid.token}})
      .then(response => dispatch(loadBids(response.data)))
      .catch(error => console.log('error'))
  }
}

export const resetBidStatus = () => ({
  type: ActionTypes.RESET_BID_STATUS,
})

// FOR GET HISTORY BID WHEN USER GO TO AUCTION DETAILS
export const fetchHistoryBids = dataBid => {
  return dispatch => {
    let input = { userId: dataBid.userId, token: dataBid.token }
    axios.get('http://api.bukalelang.id/auctions/' + dataBid.auctionId + '/bid-history', {headers: input})
      .then(response => dispatch(loadHistoryBids(response.data)))
      .catch(error => console.log(error))
  }
}

// APPEND NEW BID FROM WEBSOCKET
export const appendNewBid = newBid => {
  return {
    type: ActionTypes.APPEND_NEW_BID,
    payload: newBid
  }
}
