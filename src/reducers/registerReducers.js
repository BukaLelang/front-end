import * as ActionTypes from '../actions/constant.js'
// import { SendDataForLogin } from '../helpers/fetchData.js'

// INITIAL STATE FOR REDUCER
let init = {
  dataUser: {
    id: null,
    bukalapakId: null,
    name: null,
    username: null,
    email: null,
    success: null,
    token: null,
    message: null
  }
}

const registerReducers = (state = init, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA: {
      return state
    }
    case ActionTypes.SEND_DATA_TO_REGISTER: {
      console.log('masuk ke reducer')
      console.log(action.payload)
      return Object.assign({}, state, {dataUser: action.payload})
    }
    default: return state
  }
}

export default registerReducers
