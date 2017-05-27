import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { app } from '../actions/app'

const list = handleActions({
  [app.users.load]: (state, action) =>
    _.map(action.payload, 'id')
}, [])

const ids = handleActions({
  [app.users.load]: (state, action) =>
    _.zipObject(_.map(action.payload, 'id'), action.payload)
}, {})

export const users = combineReducers({
  list,
  ids
})
