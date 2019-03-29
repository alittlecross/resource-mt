const dbc = require('../db/database-connection')

class Helper {
  static changeEnvironment () {
    process.env.PKDATABASE = 'ketchup_test'
  }

  static async truncateDatabase () {
    await dbc.query(`
    TRUNCATE personskills, people, statuses, skills, roles, locations, grades RESTART IDENTITY CASCADE;
    `)
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO grades (grade)
      VALUES
        ('HEO'),
        ('EO');

      INSERT INTO roles (role)
      VALUES
        ('Resource Manager'),
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

      INSERT INTO people (staffid, firstname, surname, email, password)
      VALUES
        ('MS1234', 'Michael', 'Scott', 'michael.scott@scranton.com', 'password'),
        ('DS1234', 'Dwight', 'Schrute', 'dwight.schrute@scranton.com', 'password');

      UPDATE people
      SET gradeid = grades.gradeid
      FROM grades
      WHERE people.email = 'michael.scott@scranton.com' AND grades.grade = 'HEO'
         OR people.email = 'dwight.schrute@scranton.com' AND grades.grade = 'EO';


      UPDATE people
      SET locationid = locations.locationid
      FROM locations
      WHERE people.email = 'michael.scott@scranton.com' AND locations.location = 'Scranton'
         OR people.email = 'dwight.schrute@scranton.com' AND locations.location = 'Scranton';

      UPDATE people A
      SET managerid = B.personid
      FROM people B
      WHERE A.email = 'michael.scott@scranton.com' AND B.email = 'michael.scott@scranton.com'
         OR A.email = 'dwight.schrute@scranton.com' AND B.email = 'michael.scott@scranton.com';
        
      UPDATE people
      SET roleid = roles.roleid
      FROM roles
      WHERE people.email = 'michael.scott@scranton.com' AND roles.role = 'Resource Manager'
         OR people.email = 'dwight.schrute@scranton.com' AND roles.role = 'Assistant to the Regional Manager';
           
      UPDATE people
      SET statusid = statuses.statusid
      FROM statuses
      WHERE people.email = 'michael.scott@scranton.com' AND statuses.status = 'Permanent'
         OR people.email = 'dwight.schrute@scranton.com' AND statuses.status = 'Permanent';

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
      roleId: 3
    }]
  }

  static databaseUserOutputOne () {
    return {
      rowCount: 1,
      rows: [
        { personid: 1,
          firstname: 'Michael',
          surname: 'Scott',
          roleid: 1
        }
      ]
    }
  }

  static databaseUserOutputTwo () {
    return {
      rowCount: 3,
      rows: [ { kind: 'details',
        personid: 1,
        staffid: 'MS1234',
        firstname: 'Michael',
        surname: 'Scott',
        email: 'michael.scott@scranton.com',
        gradeid: 1,
        locationid: 1,
        managerid: 1,
        role: 'Regional Manager',
        statusid: 1,
        skillid: 0 },
      { kind: 'skill',
        personid: 0,
        staffid: '',
        firstname: '',
        surname: '',
        email: '',
        gradeid: 0,
        locationid: 0,
        managerid: 0,
        role: '',
        statusid: 0,
        skillid: 1 } ]
    }
  }

  static addFormDataZero () {
    return {
      staffId: 'JH1234',
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      gradeId: '2',
      locationId: '1',
      managerId: '1',
      roleid: '1',
      statusId: '1'
    }
  }

  static addFormDataOne () {
    return {
      staffId: 'JH1234',
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      gradeId: '2',
      locationId: '1',
      managerId: '1',
      roleid: '1',
      statusId: '1',
      skills: '3'
    }
  }

  static addFormDataMulti () {
    return {
      staffId: 'JH1234',
      firstName: 'Jim',
      surname: 'Halpert',
      email: 'jim.halpert@scranton.com',
      gradeId: '2',
      locationId: '1',
      managerId: '1',
      roleid: '1',
      statusId: '1',
      skills: ['1', '3']
    }
  }

  static updateFormData () {
    return {
      personId: '1',
      staffId: 'MS1234',
      firstName: 'Mickey',
      surname: 'Scott',
      email: 'michael.scott@scranton.com',
      gradeId: '1',
      roleId: '1',
      statusId: '1',
      locationId: '1',
      managerId: '1',
      skills: '1'
    }
  }

  static databaseOptionsOutput () {
    return {
      rowCount: 10,
      rows: [
        { kind: 'location', optionid: 1, option: 'Scranton' },
        { kind: 'manager', optionid: 1, option: 'Michael Scott' },
        { kind: 'role', optionid: 2, option: 'Assistant to the Regional Manager' },
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
