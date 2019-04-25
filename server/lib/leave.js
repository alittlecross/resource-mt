const DatabaseLeave = require('../services/leave')

class Leave {
  constructor (data) {
    this.leaveId = data.leaveid
    this.personId = data.personid
    this.date = this.formatDate(data.leavedate)
    this.duration = data.duration
    this.value = (data.duration === 'all day') ? 1 : 0.5
    this.type = data.leavetype
    this.status = data.status
    this.requester = data.requester
    this.thisLeaveYear = data.thisleaveyear
    this.passed = data.passed
    this.anniversaryDate = this.formatDate(data.anniversarydate)
    this.allowance = data.allowance
    this.broughtForward = data.broughtforward
    this.total = data.total
  }

  formatDate (data) {
    const date = new Date(data)
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear() - 2000
    return `${(d > 9) ? d : '0' + d}/${(m > 9) ? m : '0' + m}/${y}`
  }

  static getBalance (data) {
    return {
      startDate: data[0].anniversaryDate,
      allowance: data[0].allowance,
      broughtForward: data[0].broughtForward,
      total: data[0].total,
      takenSoFar: data.filter(e => e.passed === true && e.thisLeaveYear === true && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      planned: data.filter(e => e.passed === false && e.thisLeaveYear === true && e.status === 'approved').reduce((a, c) => a + c.value, 0),
      requested: data.filter(e => e.status === 'pending').reduce((a, c) => a + c.value, 0)
    }
  }

  static async getLeave (personId) {
    const results = await DatabaseLeave.getLeave(personId)
    return results.rows.map(row => new Leave(row))
  }

  static async submitRequest (data) {
    const dates = (data.dates === '') ? [data.start] : data.dates.split(',')
    const joiner = `', ${data.personId}, ${data.typeId}, ${data.durationId}, 2`
    const string = `'${dates.join(`${joiner}), ('`) + joiner}`

    DatabaseLeave.submitRequest(string)
  }
}

module.exports = Leave
