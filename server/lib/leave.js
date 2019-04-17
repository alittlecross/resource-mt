const DatabaseLeave = require('../services/leave')

class Leave {
  constructor (data) {
    this.leaveId = data.leaveid
    this.personId = data.personid
    this.date = this.formatDate(data.leavedate)
    this.duration = data.duration
    this.type = data.leavetype
    this.status = data.status
    this.requester = data.requester
  }

  formatDate (data) {
    const date = new Date(data)
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear() - 2000
    return `${(d > 9) ? d : '0' + d}/${(m > 9) ? m : '0' + m}/${y}`
  }

  static async getRequests (personId) {
    const results = await DatabaseLeave.getRequests(personId)
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
