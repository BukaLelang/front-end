import * as ActionTypes from '../actions/constants'

let init = {
  joinedBid: []
}

const joinedAuctionsReducers = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_JOINED_AUCTION: {
      let newState = Object.assign({}, state, {joinedBid: action.payload})
      console.log(newState)
      return newState
    }
    default:
      return state
  }
}

export default joinedAuctionsReducers
