const DatabaseDashboard = require('../services/dashboard')
const Leave = require('../lib/leave')

class Dashboard {
  static getWeek (date) {
    const d = new Date(date)
    const week = []

    for (let i = 0; i < 7; ++i) week.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + i))

    return week
  }

  static async getLeave (personId, week) {
    const weekdays = [0, 0, 0, 0, 0, 0, 0]
    const bankHolidays = await Leave.bankHolidays(week[0], week[6])

    for (let i = 0; i < bankHolidays.length; ++i) {
      weekdays[bankHolidays[i].holidaydate.getDay()] = {
        leaveId: 0,
        duration: 'all day',
        status: bankHolidays[i].description
      }
    }

    bankHolidays.forEach(d => {

    })

    const results = await DatabaseDashboard.getLeave(personId, week[0], week[6])
    const team = []

    results.rows.forEach(row => {
      if (team[0] === undefined || team[0].personId !== row.personid) {
        team.unshift({
          personId: row.personid,
          person: row.person,
          leave: weekdays.map(e => e)
        })

        const dates = results.rows.filter(e => e.personid === row.personid && e.leaveid !== null)

        dates.forEach(d => {
          if (team[0].leave[d.leavedate.getDay()]) {
            team[0].leave[d.leavedate.getDay()] = [team[0].leave[d.leavedate.getDay()], {
              leaveId: d.leaveid,
              duration: d.duration,
              status: d.status
            }]
          } else {
            team[0].leave[d.leavedate.getDay()] = {
              leaveId: d.leaveid,
              duration: d.duration,
              status: d.status
            }
          }
        })
      }
    })

    return team.reverse()
  }

  static async getRequests (personId) {
    const results = await DatabaseDashboard.getRequests(personId)
    return results.rows.map(row => new Leave(row))
  }
}

module.exports = Dashboard
