import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { app } from '../actions/app'

const list = handleActions({
  [app.users.load]: (state, { payload: users }) =>
    _.map(users, 'id')
}, [])

const ids = handleActions({
  [app.users.load]: (state, { payload: users }) =>
    _.zipObject(_.map(users, 'id'), users)
}, {})

export const users = combineReducers({
  list,
  ids
})
