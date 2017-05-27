import { combineReducers } from 'redux'

import { users } from './users'
import { calendar } from './calendar'
import { timesheet } from './timesheet/timesheet'

export const root = combineReducers({
  users,
  calendar,
  timesheet
})
