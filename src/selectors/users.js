import { createSelector } from 'reselect'

export const getList = createSelector(
  [
    state => state.users.list,
    state => state.users.data
  ],
  (list, data) => list.map(id => data[id])
)
