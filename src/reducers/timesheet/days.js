import { handleActions } from 'redux-actions'

import { app } from '../../actions/app'

export const days = handleActions({
  [app.timesheet.load]: (state, { payload: { data: { weeks } } }) => {
    const updates = {}

    weeks.forEach(week =>
      week.days_in_week.forEach(day =>
        updates[day.id] = {
          hours: day.hours,
          minutes: day.minutes
        }
      )
    )

    return {
      ...state,
      ...updates
    }
  }
}, {})
