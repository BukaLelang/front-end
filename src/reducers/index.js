import { combineReducers } from 'redux'

import loginReducers from './loginReducers.js'
import registerReducers from './registerReducers.js'
import createAuctionsReducers from './createAuctionsReducers.js'

const rootReducers = combineReducers({
  login: loginReducers,
  register: registerReducers,
  createAuctions: createAuctionsReducers
})

export default rootReducers
