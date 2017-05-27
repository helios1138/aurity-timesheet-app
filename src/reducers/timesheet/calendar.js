import { handleActions } from 'redux-actions'
import _ from 'lodash'

import { app } from '../../actions/app'

const calendarMonths = handleActions({
  [app.timesheet.load]: (state, { payload: { data: { month, weeks } } }) =>
    ({
      ...state,
      months: {
        ...state.months,
        [month]: {
          weekIds: _.map(weeks, 'week_id')
        }
      }
    })
}, { months: {} })

const calendarYears = handleActions({
  [app.timesheet.load]: (state, action) => {
    const { payload: { data: { year } } } = action

    return {
      ...state,
      years: {
        ...state.years,
        [year]: calendarMonths(state.years[year], action)
      }
    }
  }
}, { years: {} })

export const calendar = handleActions({
  [app.timesheet.load]: (state, action) => {
    const { payload: { data: { owner_id } } } = action

    return {
      ...state,
      users: {
        ...state.users,
        [owner_id]: calendarYears(state.users[owner_id], action)
      }
    }
  }
}, { users: {} })
