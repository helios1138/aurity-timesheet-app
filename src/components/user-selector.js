import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../selectors/index'
import { app } from '../actions/app'

class UserSelector extends React.Component {
  onUserSelected = ({ target: { value: userId } }) => {
    this.props.setUser(userId)
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { currentUserId, users } = this.props

    return (
      <div>
        Select user:
        <select value={currentUserId || ''}
                onChange={this.onUserSelected}>
          {!currentUserId && (
            <option value="">{}</option>
          )}
          {users.map(({ id, username }) => (
            <option key={id}
                    value={id}>
              {username}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

UserSelector = connect(
  state => ({
    users: selectors.users.getList(state),
    currentUserId: state.calendar.userId
  }),
  {
    setUser: app.calendar.setUser,
    loadUsers: app.users.load
  }
)(UserSelector)

export { UserSelector }
