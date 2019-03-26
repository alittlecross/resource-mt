const dbc = require('../db/database-connection')

class Helper {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
  }

  static async truncateDatabase () {
    await dbc.query(`
      TRUNCATE userskills, userroles, users, skills, statuses, locations, roles RESTART IDENTITY CASCADE;
    `)
  }

  static databaseUserOutput () {
    return {
      rowCount: 3,
      rows: [
        { kind: 'details',
          userid: 1,
          firstname: 'Michael',
          surname: 'Scott',
          email: 'michael.scott@scranton.com',
          password: 'password',
          role: '',
          location: 'Scranton',
          status: 'Permanent',
          manager: 'Michael Scott',
          skill: ''
        },
        { kind: 'role',
          userid: 1,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: 'Regional Manager',
          location: '',
          status: '',
          manager: '',
          skill: ''
        },
        { kind: 'skill',
          userid: 1,
          firstname: '',
          surname: '',
          email: '',
          password: '',
          role: '',
          location: '',
          status: '',
          manager: '',
          skill: 'People'
        }
      ]
    }
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO roles (role)
      VALUES
        ('Regional Manager'),
        ('Assistant to the Regional Manager'),
        ('Sales Representative'),
        ('Manager');

      INSERT INTO locations (location)
      VALUES
        ('Scranton');

      INSERT INTO statuses (status)
      VALUES
        ('Permanent');

      INSERT INTO skills (skill)
      VALUES
        ('People'),
        ('Farming'),
        ('Selling');

      INSERT INTO users (firstname, surname, email, password)
      VALUES
        ('Michael', 'Scott', 'michael.scott@scranton.com', 'password'),
        ('Dwight', 'Schrute', 'dwight.schrute@scranton.com', 'password');

      UPDATE users
      SET locationid = locations.locationid
      FROM locations
      WHERE users.email = 'michael.scott@scranton.com' AND locations.location = 'Scranton'
         OR users.email = 'dwight.schrute@scranton.com' AND locations.location = 'Scranton';

      UPDATE users
      SET statusid = statuses.statusid
      FROM statuses
      WHERE users.email = 'michael.scott@scranton.com' AND statuses.status = 'Permanent'
         OR users.email = 'dwight.schrute@scranton.com' AND statuses.status = 'Permanent';

      UPDATE users A
      SET managerid = B.userid
      FROM users B
      WHERE A.email = 'michael.scott@scranton.com' AND B.email = 'michael.scott@scranton.com'
         OR A.email = 'dwight.schrute@scranton.com' AND B.email = 'michael.scott@scranton.com';

      INSERT INTO userroles
      SELECT users.userid, roles.roleid
      FROM users, roles
      WHERE users.email = 'michael.scott@scranton.com' AND roles.role = 'Regional Manager'
         OR users.email = 'michael.scott@scranton.com' AND roles.role = 'Manager'
         OR users.email = 'dwight.schrute@scranton.com' AND roles.role = 'Assistant to the Regional Manager';

      INSERT INTO userskills
      SELECT users.userid, skills.skillid
      FROM users, skills
      WHERE users.email = 'michael.scott@scranton.com' AND skills.skill = 'People'
         OR users.email = 'dwight.schrute@scranton.com' AND skills.skill = 'Farming';
    `)
  }

  static peopleArrayDouble () {
    return [{
      userId: 3,
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      roles: [ 'Sales Representative' ],
      location: 'Scranton',
      status: 'Permanent',
      manager: 'Michael Scott',
      skills: [ 'Farming' ]
    }]
  }

  static addFormDataZero () {
    return {
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      locationId: '1',
      statusId: '1',
      managerId: '1'
    }
  }

  static addFormDataOne () {
    return {
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      roles: '3',
      locationId: '1',
      statusId: '1',
      managerId: '1',
      skills: '3'
    }
  }

  static addFormDataMulti () {
    return {
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      roles: ['2', '3'],
      locationId: '1',
      statusId: '1',
      managerId: '1',
      skills: ['1', '3']
    }
  }

  static databaseOptionsOutput () {
    return {
      rowCount: 10,
      rows: [
        { kind: 'location', optionid: 1, option: 'Scranton' },
        { kind: 'manager', optionid: 1, option: 'Michael Scott' },
        { kind: 'role', optionid: 2, option: 'Assistant to the Regional Manager' },
        { kind: 'role', optionid: 4, option: 'Manager' },
        { kind: 'role', optionid: 1, option: 'Regional Manager' },
        { kind: 'role', optionid: 3, option: 'Sales Representative' },
        { kind: 'skill', optionid: 2, option: 'Farming' },
        { kind: 'skill', optionid: 1, option: 'People' },
        { kind: 'skill', optionid: 3, option: 'Selling' },
        { kind: 'status', optionid: 1, option: 'Permanent' }
      ]
    }
  }
}

module.exports = Helper
