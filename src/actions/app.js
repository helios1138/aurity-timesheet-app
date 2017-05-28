import { createActions } from '../func/create-actions'

import { endpoints } from './endpoints'

export const app = createActions({
  users: {
    load: () =>
      fetch(endpoints.users())
        .then(response => response.json())
  },

  calendar: {
    setUser: userId => userId,

    setYear: year => year,

    setMonth: month => month,

    setWeek: weekNo => weekNo
  },

  timesheet: {
    load: ({ userId, year, month }) =>
      fetch(endpoints.getWeeks({ month, year, userId }))
        .then(response => response.json()),

    approve: ({ weekId }) => {
      const body = new FormData()

      body.append('status', 'approved')

      return fetch(endpoints.putWeeks({ weekId }), {
        method: 'PUT',
        body
      })
        .then(response => response.json())
    },

    reject: ({ weekId }) => {
      const body = new FormData()

      body.append('status', 'rejected')

      return fetch(endpoints.putWeeks({ weekId }), {
        method: 'PUT',
        body
      })
        .then(response => response.json())
    }
  }
})
