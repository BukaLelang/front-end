import { combineReducers } from 'redux'

import dataReducers from './dataReducers.js'
import loginReducers from './loginReducers.js'
import registerReducers from './registerReducers.js'

const rootReducers = combineReducers({
  data: dataReducers,
  login: loginReducers,
  register: registerReducers
})

export default rootReducers
