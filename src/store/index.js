import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducers from '../reducers'

const store = createStore(rootReducers, applyMiddleware(thunk, logger))

export default store
