const dbc = require('../database-connection')

class Database {
  static async getOptions () {
    return dbc.query(`
      SELECT 'role' AS kind, roleid AS optionid, role AS option
      FROM roles
            
      UNION
            
      SELECT 'location' AS kind, locationid AS optionid, location AS option
      FROM locations
            
      UNION 
            
      SELECT 'status' AS kind, statusid AS optionid, status AS option
      FROM statuses
      
      UNION
            
      SELECT 'manager' AS kind, people.personid AS optionid, CONCAT( firstname, ' ', surname) AS option
      FROM people
      INNER JOIN personroles
      ON people.personid = personroles.personid
      INNER JOIN roles
      ON personroles.roleid = roles.roleid
      WHERE role = 'Resource Manager'
                  
      UNION 
            
      SELECT 'skill' AS kind, skillid AS optionid, skill AS option
      FROM skills
      
      ORDER BY kind, option;
    `)
  }
}

module.exports = Database
