import { handleActions } from 'redux-actions'

import { app } from '../actions/app'

export const calendar = handleActions({
  [app.calendar.setUser]: (state, { payload: userId }) =>
    ({ ...state, userId }),

  [app.calendar.setYear]: (state, { payload: year }) =>
    ({ ...state, year, month: 1 }),

  [app.calendar.setMonth]: (state, { payload: month }) =>
    ({ ...state, month }),

  [app.calendar.setWeek]: (state, { payload: weekNo }) =>
    ({ ...state, weekNo })
}, {
  userId: null,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  weekNo: null
})
