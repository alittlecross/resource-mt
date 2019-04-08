const DatabaseConnection = require('../../../db/database-connection')

class DatabaseEdit {
  static async updatePerson (data) {
    return DatabaseConnection.query(`
      UPDATE people
      SET
        staffid = $1,
        firstname = $2,
        surname = $3,
        email = $4,
        gradeid = $5,
        locationid = $6,
        managerid = $7,
        roleid = $8,
        statusid = $9
      WHERE personid = $10
      RETURNING personid;
    `, [data.staffId, data.firstName, data.surname, data.email, data.gradeId, data.locationId, data.managerId, data.roleId, data.statusId, data.personId])
  }

  static async deleteSkills (data) {
    return DatabaseConnection.query(`
      DELETE FROM personskills
      WHERE personid = $1;
    `, [data.personId])
  }
}

module.exports = DatabaseEdit
