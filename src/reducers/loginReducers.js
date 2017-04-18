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

const loginReducers = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.SEND_DATA_TO_LOGIN: {
      // console.log('isi reducer ' + JSON.stringify(action.payload))
      return Object.assign({}, state, {dataUser: action.payload})
    }
    default: return state
  }
}

export default loginReducers
