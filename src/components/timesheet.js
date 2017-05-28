import React from 'react'

import { UserSelector } from './user-selector'
import { Calendar } from './calendar'
import { WeekStatus } from './week-status'

export const Timesheet = () => (
  <div>
    <UserSelector />
    <Calendar />
    <WeekStatus />
  </div>
)
