const dbc = require('../database-connection')

class Database {
  static async getPeopleRolesSkills (where = '') {
    return dbc.query(`
    SELECT 'details' AS kind, A.personid, A.firstname, A.surname, A.email, A.password, '' AS role, locations.location, statuses.status, CONCAT( B.firstname, ' ', B.surname) AS manager, '' AS skill
    FROM people A
    INNER JOIN locations
    ON A.locationid = locations.locationid
    INNER JOIN statuses
    ON A.statusid = statuses.statusid
    INNER JOIN people B
    ON A.managerid = B.personid
    ${where}
    
    UNION

    SELECT 'role' AS kind, A.personid AS personid, '' AS firstname, '' AS surname, '' AS email, '' AS password, roles.role, '' AS location, '' AS status, '' AS manager, '' AS skill
    FROM personroles
    INNER JOIN roles
    ON personroles.roleid = roles.roleid
    INNER JOIN people A
    ON personroles.personid = A.personid
    ${where}
    
    UNION

    SELECT 'skill' AS kind, A.personid AS personid, '' AS firstname, '' AS surname, '' AS email, '' AS password, '' AS role, '' AS location, '' AS status, '' AS manager, skills.skill
    FROM personskills
    INNER JOIN skills
    ON personskills.skillid = skills.skillid
    INNER JOIN people A
    ON personskills.personid = A.personid
    ${where}
    
    ORDER BY kind, firstname, role, skill;
    `)
  }

  static async alreadyExists (email) {
    return dbc.query(`
      SELECT *
      FROM people
      WHERE email = $1
    `, [email])
  }

  static async addPerson (data) {
    return dbc.query(`
      INSERT INTO people (firstname, surname, email, locationid, statusid, managerid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING personid;
    `, [data.firstName, data.surname, data.email, data.locationId, data.statusId, data.managerId])
  }

  static async addRolesSkills (string) {
    return dbc.query(string)
  }
}

module.exports = Database
