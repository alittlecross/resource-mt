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
      startDate: Leave.formatDate(balance.startdate),
      endDate: Leave.formatDate(balance.enddate),
      allowance: balance.allowance,
      broughtForward: balance.broughtforward,
      total: balance.total,
      takenSoFar: requests.filter(e => e.passed === true && e.thisLeaveYear === true && e.type === 'annual' && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      planned: requests.filter(e => e.passed === false && e.thisLeaveYear === true && e.type === 'annual' && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      requested: requests.filter(e => e.thisLeaveYear === true && e.type === 'annual' && e.status === 'pending').reduce((a, c) => a + c.value, 0)
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
    console.log(data)
    const results = await this.getLeave(data.personId)
    const dates = (data.dates === '') ? [data.start] : data.dates.split(',')
    const joiner = `', ${data.personId}, ${data.typeId}, ${data.durationId}, 2`
    const string = `'${dates.join(`${joiner}), ('`) + joiner}`
    const count = results.requests.map(e => e.date).filter(r => dates.map(d => Leave.formatDate(d)).includes(r)).length
    const s = count > 1 ? 's' : ''

    if (count) {
      return {
        status: false,
        message_1: `date${s} already requested.`,
        message_2: 'cancel and resubmit to amend.'
      }
    } else {
      await DatabaseLeave.submitRequest(string)
      return {
        status: true
      }
    }
  }
}

module.exports = Leave
