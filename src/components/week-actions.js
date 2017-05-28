import './week-actions.css'

import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../selectors/index'
import { app } from '../actions/app'

class WeekActions extends React.Component {
  get approveDisabled() {
    return this.props.week.status === 'approved'
  }

  get rejectDisabled() {
    return this.props.week.status === 'rejected'
  }

  approve = e => {
    e.preventDefault()
    this.props.approve({ weekId: this.props.week.id })
  }

  reject = e => {
    e.preventDefault()
    this.props.reject({ weekId: this.props.week.id })
  }

  render() {
    return this.props.week ?
      <div className="week-actions">
        <a href="#"
           className="btn"
           disabled={this.approveDisabled}
           onClick={this.approve}>
          Approve
        </a>
        <a href="#"
           className="btn"
           disabled={this.rejectDisabled}
           onClick={this.reject}>
          Reject
        </a>
      </div> :
      null
  }
}

WeekActions = connect(
  state => ({ week: selectors.timesheet.getCurrentWeek(state) }),
  {
    approve: app.timesheet.approve,
    reject: app.timesheet.reject
  }
)(WeekActions)

export { WeekActions }
