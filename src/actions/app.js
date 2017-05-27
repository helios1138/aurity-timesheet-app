import { createActions } from '../func/create-actions'

export const app = createActions({
  users: {
    load: () =>
      fetch('https://timesheet-staging-aurity.herokuapp.com/api/users')
        .then(response => response.json())
  },

  calendar: {
    setUser: userId => userId,
    setYear: year => year,
    setMonth: month => month,
    setWeek: weekNo => weekNo
  }
})
