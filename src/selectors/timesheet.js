import { createSelector } from 'reselect'
import _ from 'lodash'

const getWeeks = createSelector(
  [
    state => state.timesheet.calendar,
    state => state.timesheet.weeks,
    state => state.calendar.userId,
    state => state.calendar.year,
    state => state.calendar.month
  ],
  (calendar, weeks, userId, year, month) => _
    .chain(calendar)
    .get(`users.${userId}.years.${year}.months.${month}.weekIds`, [])
    .map(id => weeks[id])
    .sortBy('weekNo')
    .value()
)

export const getDays = createSelector(
  [
    getWeeks,
    state => state.timesheet.days
  ],
  (weeks, days) => {
    const dates = {}

    weeks.forEach(week =>
      week.days.forEach(id => {
        const day = days[id]

        if (!dates[day.dayNo]) {
          dates[day.dayNo] = day
        }
      }))

    return dates
  }
)

export const getWeekStatus = createSelector(
  [
    getWeeks,
    state => state.calendar.weekNo,
    state => state.users.data
  ],
  (weeks, weekNo, users) => {
    const weekData = _.find(weeks, { weekNo })

    return weekData &&
      {
        status: weekData.status,
        approvedBy: weekData.approvedBy && users[weekData.approvedBy],
        approvedAt: weekData.approvedAt
      }
  }
)
