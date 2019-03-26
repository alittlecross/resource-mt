const dbc = require('../database-connection')

class Database {
  static async getCurrentUserRecord (email) {
    return dbc.query(`
      SELECT 'details' AS kind, A.personid, A.firstname, A.surname, A.email, A.password, '' AS role, locations.location, statuses.status, CONCAT( B.firstname, ' ', B.surname) AS manager, '' AS skill
      FROM people A
      INNER JOIN locations
      ON A.locationid = locations.locationid
      INNER JOIN statuses
      ON A.statusid = statuses.statusid
      INNER JOIN people B
      ON A.managerid = B.personid
      WHERE A.email = $1

      UNION

      SELECT 'role' AS kind, people.personid AS personid, '' AS firstname, '' AS surname, '' AS email, '' AS password, roles.role, '' AS location, '' AS status, '' AS manager, '' AS skill
      FROM personroles
      INNER JOIN roles
      ON personroles.roleid = roles.roleid
      INNER JOIN people
      ON personroles.personid = people.personid
      WHERE email = $1

      UNION

      SELECT 'skill' AS kind, people.personid AS personid, '' AS firstname, '' AS surname, '' AS email, '' AS password, '' AS role, '' AS location, '' AS status, '' AS manager, skills.skill
      FROM personskills
      INNER JOIN skills
      ON personskills.skillid = skills.skillid
      INNER JOIN people
      ON personskills.personid = people.personid
      WHERE email = $1

      ORDER BY kind, firstname, role, skill;
    `, [email])
  }
}

module.exports = Database
