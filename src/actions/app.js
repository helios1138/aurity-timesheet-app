import { createActions } from '../func/create-actions'

export const app = createActions({
  users: {
    load: () =>
      fetch('https://timesheet-staging-aurity.herokuapp.com/api/users')
        .then(response => response.json())
  }
})
