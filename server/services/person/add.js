const DatabaseConnection = require('../../../db/database-connection')

class DatabaseAdd {
  static async getPeople (data) {
    return DatabaseConnection.query(`
      SELECT *
      FROM people
      INNER JOIN roles
      ON people.roleid = roles.roleid
      WHERE email = $1 OR staffid = $2

      ORDER BY firstname, surname
    `, [data.email, data.staffId])
  }

  static async addPerson (data) {
    return DatabaseConnection.query(`
      INSERT INTO people (staffid, firstname, surname, email, gradeid, locationid, managerid, roleid, statusid)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING personid;
    `, [data.staffId, data.firstName, data.surname, data.email, data.gradeId, data.locationId, data.managerId, data.roleId, data.statusId])
  }
}

module.exports = DatabaseAdd
