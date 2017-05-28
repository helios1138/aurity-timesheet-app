import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../selectors/index'

let WeekStatus = ({ week }) => (
  week ?
    (
      <div>
        <div>Status: {week.status || 'waiting'}</div>
        {week.status === 'approved' && (
          <div>
            <div>Approved by {week.approvedBy.username}</div>
            <div>Approved at {'' + week.approvedAt}</div>
          </div>
        )}
      </div>
    ) :
    <div>---</div>
)

WeekStatus = connect(
  state => ({ week: selectors.timesheet.getCurrentWeek(state) })
)(WeekStatus)

export { WeekStatus }
