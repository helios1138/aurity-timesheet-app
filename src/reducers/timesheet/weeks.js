import { handleActions } from 'redux-actions'

import { app } from '../../actions/app'

export const weeks = handleActions({
  [app.timesheet.load]: (state, { payload: { data: { weeks } } }) => {
    const update = {}

    weeks.forEach(week =>
      update[week.week_id] = {
        status: week.status,
        approvedBy: week.approved_by_id,
        approvedAt: new Date(week.approved_by_date),
        days: week.days_in_week.map(day => day.id)
      }
    )

    return {
      ...state,
      ...update
    }
  }
}, {})
