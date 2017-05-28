import { handleActions, combineActions } from 'redux-actions'
import _ from 'lodash'

import { app } from '../../actions/app'

const handleWeek = handleActions(
  {
    [combineActions(
      app.timesheet.load,
      app.timesheet.approve,
      app.timesheet.reject
    )]: (state, { payload: week }) => ({
      id: week.week_id,
      weekNo: week.week_number,
      status: week.status,
      approvedBy: week.approved_by_id,
      approvedAt: new Date(week.approved_by_date),
      days: _.map(week.days_in_week, 'id')
    })
  },
  {
    status: null,
    approvedBy: null,
    approvedAt: null,
    days: []
  }
)

export const weeks = handleActions({
  [app.timesheet.load]: (state, { type, payload: { data: { weeks } } }) => {
    const update = {}

    weeks.forEach(week => {
      update[week.week_id] = handleWeek(update[week.week_id], { type, payload: week })
    })

    return {
      ...state,
      ...update
    }
  },

  [combineActions(
    app.timesheet.approve,
    app.timesheet.reject
  )]: (state, { type, payload: week }) => ({
    ...state,
    [week.week_id]: handleWeek(state[week.week_id], { type, payload: week })
  })
}, {})
