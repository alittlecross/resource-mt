const DatabaseLeave = require('../services/leave')

class Leave {
  constructor (data) {
    this.leaveId = data.leaveid
    this.personId = data.personid
    this.date = Leave.formatDate(data.leavedate)
    this.duration = data.duration
    this.value = (data.duration === 'all day') ? 1 : 0.5
    this.type = data.leavetype
    this.status = data.status
    this.requester = data.requester
    this.thisLeaveYear = data.thisleaveyear
    this.passed = data.passed
  }

  static formatDate (data) {
    const date = new Date(data)
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear() - 2000
    return `${(d > 9) ? d : '0' + d}/${(m > 9) ? m : '0' + m}/${y}`
  }

  static async bankHolidays () {
    const results = await DatabaseLeave.bankHolidays()
    return results.rows.map(row => row.holidaydate)
  }

  static getBalance (balance, requests) {
    return {
      startDate: Leave.formatDate(balance.anniversarydate),
      allowance: balance.allowance,
      broughtForward: balance.broughtforward,
      total: balance.total,
      takenSoFar: requests.filter(e => e.passed === true && e.thisLeaveYear === true && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      planned: requests.filter(e => e.passed === false && e.thisLeaveYear === true && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      requested: requests.filter(e => e.status === 'pending').reduce((a, c) => a + c.value, 0)
    }
  }

  static async getLeave (personId) {
    const results = await DatabaseLeave.getLeave(personId)
    const balance = results.rows.filter(row => row.type === 'balance')[0]
    const requests = results.rows.filter(row => row.type === 'request').map(row => new Leave(row))
    return {
      balance: Leave.getBalance(balance, requests),
      requests: requests
    }
  }

  static async submitRequest (data) {
    const dates = (data.dates === '') ? [data.start] : data.dates.split(',')
    const joiner = `', ${data.personId}, ${data.typeId}, ${data.durationId}, 2`
    const string = `'${dates.join(`${joiner}), ('`) + joiner}`
    DatabaseLeave.submitRequest(string)
  }
}

module.exports = Leave
