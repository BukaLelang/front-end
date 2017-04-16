import { combineReducers } from 'redux'

import dataReducers from './dataReducers.js'
import loginReducers from './loginReducers.js'
import registerReducers from './registerReducers.js'
import auctionsReducers from './auctionsReducers.js'

const rootReducers = combineReducers({
  data: dataReducers,
  login: loginReducers,
  register: registerReducers,
  auctions: auctionsReducers
})

export default rootReducers
