import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../selectors/index'

let WeekStatus = ({ weekStatus }) => (
  weekStatus ?
    (
      <div>
        <div>Status: {weekStatus.status || 'waiting'}</div>
        {weekStatus.status === 'approved' && (
          <div>
            <div>Approved by {weekStatus.approvedBy.username}</div>
            <div>Approved at {'' + weekStatus.approvedAt}</div>
          </div>
        )}
      </div>
    ) :
    <div>---</div>
)

WeekStatus = connect(
  state => ({ weekStatus: selectors.timesheet.getWeekStatus(state) })
)(WeekStatus)

export { WeekStatus }
