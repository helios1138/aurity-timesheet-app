import { combineReducers } from 'redux'

import { users } from './users'
import { calendar } from './calendar'

export const root = combineReducers({
  users,
  calendar
})
