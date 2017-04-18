import * as ActionTypes from '../actions/constants'

const bidReducers = (state = { bids: [], bidsHistory: [] }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_BIDS: {
      console.log(action.payload);
      const { name, current_price, bidding_time } = action.payload;

      const newBid = {
        bidding_time,
        name_of_bidder: name,
        bid_nominal: current_price,
      };

      const currentBidsHistory = state.bidsHistory;

      return Object.assign({}, state, { bidsHistory: currentBidsHistory.concat(newBid) } )
    }
    case ActionTypes.LOAD_HISTORY_BIDS: {
      return Object.assign({}, state, { bidsHistory: [...action.payload.bid_history] })
    }
    default:
      return state

  }
}

export default bidReducers
