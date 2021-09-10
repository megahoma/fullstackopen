import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
