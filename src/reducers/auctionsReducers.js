import * as ActionTypes from '../actions/constant.js'

// INITIAL STATE FOR REDUCER
let init = {
  asyncKey: true,
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
    case ActionTypes.GET_DATA: {
      return state
    }
    case ActionTypes.SEND_DATA_TO_CREATE_AUCTION: {
      console.log('isi reducer ' + JSON.stringify(action.payload))
      return state
    }
    default: return state
  }
}

export default auctionsReducers
