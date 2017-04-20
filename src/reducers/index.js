import { combineReducers } from 'redux'

import loginReducers from './loginReducers'
import registerReducers from './registerReducers'
import createAuctionsReducers from './createAuctionsReducers'
import auctionReducers from './auctionReducers'
import bidReducers from './bidReducers'
import joinedAuctionsReducers from './joinedAuctionsReducers'

const rootReducers = combineReducers({
  login: loginReducers,
  register: registerReducers,
  auction: auctionReducers,
  createAuctions: createAuctionsReducers,
  bid: bidReducers,
  joinedAuctions: joinedAuctionsReducers
})

export default rootReducers
