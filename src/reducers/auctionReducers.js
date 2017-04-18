import * as ActionTypes from '../actions/constants'

const auctionReducers = (state = { listAuctions: { auctions: [], status: false }, auctionBid: {} }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_AUCTIONS: {
      return Object.assign({}, state, {
        listAuctions: action.payload
      })
    }
    case ActionTypes.LOAD_AUCTION_BY_ID: {
      const id = action.payload
      const arrAuctionId = state.listAuctions.auctions.map(data => data.id)
      const AuctionIdIndex = arrAuctionId.indexOf(id)
      return Object.assign({}, state, {
        auctionBid: state.listAuctions.auctions[AuctionIdIndex]
      })
    }
    default:
      return state
  }
}

export default auctionReducers
