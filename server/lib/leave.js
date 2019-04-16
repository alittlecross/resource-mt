const DatabaseLeave = require('../services/leave')

class Leave {
  constructor (data) {
    this.date = this.formatDate(data.leavedate)
    this.duration = this.formatDuration(data.duration)
    this.type = data.leavetype
    this.status = this.formatStatus(data.approved)
  }

  formatDate (data) {
    const date = new Date(data)
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear() - 2000
    return `${(d > 9) ? d : '0' + d}/${(m > 9) ? m : '0' + m}/${y}`
  }

  formatDuration (data) {
    return (data === 'am' || data === 'pm') ? data : 'all day'
  }

  formatStatus (data) {
    return (data) ? 'approved' : 'pending'
  }

  static async getRequest (data) {
    const results = await DatabaseLeave.getRequest(data)
    return results.rows.map(row => new Leave(row))
  }

  static async submitRequest (data) {
    const dates = (data.dates === '') ? [data.start] : data.dates.split(',')
    const joiner = `', ${data.personId}, ${data.typeId}, ${data.durationId}`
    const string = `'${dates.join(`${joiner}), ('`) + joiner}`

    DatabaseLeave.submitRequest(string)
  }
}

module.exports = Leave
