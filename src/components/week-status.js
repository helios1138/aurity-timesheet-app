import './week-status.css'

import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as selectors from '../selectors/index'

let WeekStatus = ({ week }) => (
  week ?
    (
      <div className="week-status">
        <div className="content">
          <div>Status: {week.status || 'pending'}</div>
          {week.status === 'approved' && (
            <div>
              <div>Approved by {week.approvedBy.username}</div>
              <div>Approved at {'' + moment(week.approvedAt).format('D.MM.YYYY HH:mm:ss')}</div>
            </div>
          )}
        </div>
      </div>
    ) :
    <div className="week-status">{}</div>
)

WeekStatus = connect(
  state => ({ week: selectors.timesheet.getCurrentWeek(state) })
)(WeekStatus)

export { WeekStatus }
