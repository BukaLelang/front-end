import { combineReducers } from 'redux'

import loginReducers from './loginReducers'
import registerReducers from './registerReducers'
import createAuctionsReducers from './createAuctionsReducers'
import auctionReducers from './auctionReducers'

const rootReducers = combineReducers({
  login: loginReducers,
  register: registerReducers,
  auction: auctionReducers,
  createAuctions: createAuctionsReducers
})

export default rootReducers
