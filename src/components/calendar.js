import './calendar.css'

import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { app } from '../actions/app'
import { getWeekNumber } from '../func/get-week-number'
import * as selectors from '../selectors/index'

class Calendar extends React.Component {
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  get monthName() {
    const { month, year } = this.props
    return `${this.monthNames[month - 1]} ${year}`
  }

  get monthLength() {
    const { month, year } = this.props
    return new Date(year, month, 0).getDate()
  }

  get firstDayOfMonth() {
    const { month, year } = this.props

    let firstDay = new Date(year, month - 1, 1).getDay()

    return (firstDay === 0) ?
      7 :
      firstDay
  }

  get firstWeekOfMonth() {
    const { month, year } = this.props

    if (month === 1 && this.firstDayOfMonth > 4) {
      return 0
    }

    return getWeekNumber(new Date(year, month - 1, 1))
  }

  get calendarWeeks() {
    let
      weeks = [{ weekNo: this.firstWeekOfMonth, dates: [] }],
      week = weeks[0],
      day = this.firstDayOfMonth

    for (let i = 0; i < day; i++) {
      week.dates.push(null)
    }

    for (let date = 1, l = this.monthLength; date <= l; date++) {
      if (day > 7) {
        day = 1
        week = { weekNo: week.weekNo + 1, dates: [] }
        weeks.push(week)
      }

      week.dates[day - 1] = date

      day++
    }

    return weeks
  }

  previousMonth = () => {
    const { month, year, setMonth, setYear } = this.props

    if (month > 1) {
      setMonth(month - 1)
    }
    else {
      setMonth(12)
      setYear(year - 1)
    }
  }

  nextMonth = () => {
    const { month, year, setMonth, setYear } = this.props

    if (month < 12) {
      setMonth(month + 1)
    }
    else {
      setMonth(1)
      setYear(year + 1)
    }
  }

  onWeekClick = week => {
    this.props.setWeek(week.weekNo)
  }

  componentWillReceiveProps({ month, year, userId }) {
    if (
      !userId ||
      (
        this.props.month === month &&
        this.props.year === year &&
        this.props.userId === userId
      )
    ) {
      return
    }

    this.props.loadMonthData({ month, year, userId })
  }

  componentDidMount() {
    const { month, year, userId } = this.props

    if (!userId) {
      return
    }

    this.props.loadMonthData({ month, year, userId })
  }

  render() {
    return (
      <div className="calendar">
        <div className="month">
          <button className="btn"
                  onClick={this.previousMonth}>
            {'<'}
          </button>
          <span className="name">{this.monthName}</span>
          <button className="btn"
                  onClick={this.nextMonth}>
            {'>'}
          </button>
        </div>
        <div className="weeks">
          {this.calendarWeeks.map((week, i) => (
            <div className={classnames('week', { selected: (week.weekNo === this.props.week) })}
                 key={i}
                 onClick={() => this.onWeekClick(week)}>
              {week.dates.map((date, j) => (
                <div key={j}
                     className="date">
                  {date}
                  {this.props.data[date] &&
                  (this.props.data[date].hours > 0 || this.props.data[date].minutes > 0) && (
                    <div className="time">
                      {this.props.data[date].hours}h {this.props.data[date].minutes}m
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Calendar = connect(
  state => ({
    month: state.calendar.month,
    year: state.calendar.year,
    week: state.calendar.weekNo,
    userId: state.calendar.userId,
    data: selectors.timesheet.getDays(state)
  }),
  {
    setYear: app.calendar.setYear,
    setMonth: app.calendar.setMonth,
    setWeek: app.calendar.setWeek,
    loadMonthData: app.timesheet.load
  }
)(Calendar)

export { Calendar }

//Calendar [month, year, week, monthData, setYear(year), setMonth(month), setWeek(weekNo)]


/*
timesheet
    getDays(getWeeks)
        result
            ${day}
                hours
                minutes
    getWeeks(getUserId, getYear, getMonth)
    getWeekId(getWeeks, getWeekNo)
    getWeekStatus(getWeekId)
        result
            status
            approvedBy
            approvedAt

 */