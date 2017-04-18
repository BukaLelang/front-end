import * as ActionTypes from './constants'

export const loadAuctions = data => {
  return {
    type: ActionTypes.LOAD_AUCTIONS,
    payload: data
  }
}

export const fetchAuctions = () => {
  return dispatch => {
    fetch('http://api.bukalelang.id/auctions')
    .then(response => response.json())
    .then(data => {
      dispatch(loadAuctions(data))
    })
    .catch(err => console.error(err))
  }
}

export const loadAuctionById = id => {
  return {
    type: ActionTypes.LOAD_AUCTION_BY_ID,
    payload: id
  }
}
