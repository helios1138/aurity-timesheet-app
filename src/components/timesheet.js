import './timesheet.css'

import React from 'react'

import { UserSelector } from './user-selector'
import { Calendar } from './calendar'
import { WeekStatus } from './week-status'
import { WeekActions } from './week-actions'

export const Timesheet = () => (
  <div className="timesheet">
    <UserSelector />
    <Calendar />
    <WeekStatus />
    <WeekActions />
  </div>
)
