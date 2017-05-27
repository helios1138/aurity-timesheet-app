import { combineReducers } from 'redux'

import { weeks } from './weeks'
import { days } from './days'
import { calendar } from './calendar'

export const timesheet = combineReducers({
  weeks,
  days,
  calendar
})
