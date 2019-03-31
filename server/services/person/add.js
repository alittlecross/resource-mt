const dbc = require('../../../db/database-connection')

class Database {
  static async addPerson (data) {
    return dbc.query(`
      INSERT INTO people (staffid, firstname, surname, email, gradeid, locationid, managerid, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING personid;
    `, [data.staffId, data.firstName, data.surname, data.email, data.gradeId, data.locationId, data.managerId, data.roleId, data.statusId])
  }
}

module.exports = Database
