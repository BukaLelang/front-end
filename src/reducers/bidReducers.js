import * as ActionTypes from '../actions/constants'

const bidReducers = (state = { bids: [], bidsHistory: [] }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_BIDS: {
      const currentBidsHistory = state.bidsHistory;
      return Object.assign({}, state, { bidsHistory: [...currentBidsHistory] } )
    }
    case ActionTypes.LOAD_HISTORY_BIDS: {
      return Object.assign({}, state, { bidsHistory: [...action.payload.bid_history] })
    }
    case ActionTypes.APPEND_NEW_BID: {
      const currentBidsHistory = state.bidsHistory;
      const { current_price, name, bidding_time } = action.payload;
      const newBidState = {
        name_of_bidder: name,
        bid_nominal: current_price,
        bidding_time
      }
      return Object.assign({}, state, { bidsHistory: [newBidState, ...currentBidsHistory] })
    }
    default:
      return state
  }
}

export default bidReducers
