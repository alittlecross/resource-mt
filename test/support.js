const dbc = require('../db/database-connection')

class Helper {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
  }

  static async truncateDatabase () {
    await dbc.query(`
      TRUNCATE personskills, personroles, people, skills, statuses, locations, roles RESTART IDENTITY CASCADE;
    `)
  }

  static databaseUserOutput () {
    return {
      rowCount: 3,
      rows: [
        { kind: 'details',
          personid: 1,
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
          personid: 1,
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
          personid: 1,
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
        ('Sales Representative');

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

      INSERT INTO people (firstname, surname, email, password)
      VALUES
        ('Michael', 'Scott', 'michael.scott@scranton.com', 'password'),
        ('Dwight', 'Schrute', 'dwight.schrute@scranton.com', 'password');

      UPDATE people
      SET locationid = locations.locationid
      FROM locations
      WHERE people.email = 'michael.scott@scranton.com' AND locations.location = 'Scranton'
         OR people.email = 'dwight.schrute@scranton.com' AND locations.location = 'Scranton';

      UPDATE people
      SET statusid = statuses.statusid
      FROM statuses
      WHERE people.email = 'michael.scott@scranton.com' AND statuses.status = 'Permanent'
         OR people.email = 'dwight.schrute@scranton.com' AND statuses.status = 'Permanent';

      UPDATE people A
      SET managerid = B.personid
      FROM people B
      WHERE A.email = 'michael.scott@scranton.com' AND B.email = 'michael.scott@scranton.com'
         OR A.email = 'dwight.schrute@scranton.com' AND B.email = 'michael.scott@scranton.com';

      INSERT INTO personroles
      SELECT people.personid, roles.roleid
      FROM people, roles
      WHERE people.email = 'michael.scott@scranton.com' AND roles.role = 'Regional Manager'
         OR people.email = 'michael.scott@scranton.com' AND roles.role = 'Manager'
         OR people.email = 'dwight.schrute@scranton.com' AND roles.role = 'Assistant to the Regional Manager';

      INSERT INTO personskills
      SELECT people.personid, skills.skillid
      FROM people, skills
      WHERE people.email = 'michael.scott@scranton.com' AND skills.skill = 'People'
         OR people.email = 'dwight.schrute@scranton.com' AND skills.skill = 'Farming';
    `)
  }

  static peopleArrayDouble () {
    return [{
      personId: 3,
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
