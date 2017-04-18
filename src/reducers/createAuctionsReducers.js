import * as ActionTypes from '../actions/constants.js'

// INITIAL STATE FOR REDUCER
let init = {
  dataUser: {
    bukalapakId: null,
    email: null,
    id: null,
    message: null,
    name: null,
    saldo: null,
    success: null,
    token: null,
    username: null
  }
}

const auctionsReducers = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.SEND_DATA_TO_CREATE_AUCTION: {
      console.log(action.payload)
      return Object.assign({}, state, {dataUser: action.payload})
    }
    default: return state
  }
}

export default auctionsReducers
