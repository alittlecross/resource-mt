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
            
      SELECT 'manager' AS kind, users.userid AS optionid, CONCAT( firstname, ' ', surname) AS option
      FROM users
      INNER JOIN userroles
      ON users.userid = userroles.userid
      INNER JOIN roles
      ON userroles.roleid = roles.roleid
      WHERE role = 'Manager'
                  
      UNION 
            
      SELECT 'skill' AS kind, skillid AS optionid, skill AS option
      FROM skills
      
      ORDER BY kind, option;
    `)
  }
}

module.exports = Database
