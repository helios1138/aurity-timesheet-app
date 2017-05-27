export const endpoints = {
  users: () =>
    'https://timesheet-staging-aurity.herokuapp.com/api/users',

  getWeeks: ({ month, year, userId }) =>
    `https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${month}/${year}/${userId}`,

  putWeeks: ({ weekId }) =>
    `https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${weekId}/users/2`
}
