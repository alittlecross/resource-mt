const dbc = require('../database-connection')

class Seeds {
  static async createRoles () {
    await dbc.query(`
      INSERT INTO roles (role)
      VALUES 
        ('Apprentice Developer'),
        ('Database Analyst'),
        ('Developer'),
        ('Junior Developer'),
        ('Lead Developer'),
        ('Manager'),
        ('Principal Developer'),
        ('Resource Manager'),
        ('Senior Developer'),
        ('Systems Administrator');
    `)
  }

  static async createLocations () {
    await dbc.query(`
      INSERT INTO locations (location)
      VALUES 
        ('Bristol'),
        ('Exeter'),
        ('Newcastle'),
        ('Warrington'),
        ('York');
    `)
  }

  static async createStatuses () {
    await dbc.query(`
      INSERT INTO statuses (status)
      VALUES
        ('Contractor'),
        ('Permanent');
    `)
  }

  static async createSkills () {
    await dbc.query(`
      INSERT INTO skills (skill)
      VALUES
        ('C#'),
        ('Java'),
        ('Node.js'),
        ('Ruby'),
        ('SQL');
    `)
  }

  static async createUsers () {
    await dbc.query(`
      INSERT INTO users (firstname, surname, email, password)
      VALUES
        ('Alan', 'Slee', 'alan.slee@defra.gov.uk', 'password'),
        ('Nicholas', 'Blows', 'nicholas.blows@rpa.gov.uk', 'password'),
        ('Paul', 'Doyle', 'paul.doyle@rpa.gov.uk', 'password'),
        ('Lee', 'Gordon', 'lee.gordon@rpa.gov.uk', 'password'),
        ('Ian', 'Noonan', 'ian.noonan@rpa.gov.uk', 'password'),
        ('Matthew', 'Quinton', 'matthew.quinton@rpa.gov.uk', 'password'),
        ('John', 'Watson', 'john.watson@rpa.gov.uk', 'password'),
        ('Scott', 'Dormand', 'scott.dormand@rpa.gov.uk', 'password'),
        ('Fay', 'Toward', 'fay.toward@rpa.gov.uk', 'password'),
        ('Paul', 'Fazackerley', 'paul.fazackerley@rpa.gov.uk', 'password'),
        ('Tim', 'Buttrworth', 'tim.butterworth@rpa.gov.uk', 'password'),
        ('Marc', 'Solomon', 'marc.solomon@rpa.gov.uk', 'password'),
        ('Jonathan', 'Drake', 'jonathan.drake@defra.gov.uk', 'password');
    `)
  }

  static async updateLocations () {
    await dbc.query(`
      UPDATE users
      SET locationid = locations.locationid
      FROM locations
      WHERE users.email = 'alan.slee@defra.gov.uk' AND locations.location = 'York'
         OR users.email = 'nicholas.blows@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'paul.doyle@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'lee.gordon@rpa.gov.uk' AND locations.location = 'Newcastle'
         OR users.email = 'ian.noonan@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'matthew.quinton@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'john.watson@rpa.gov.uk' AND locations.location = 'Newcastle'
         OR users.email = 'scott.dormand@rpa.gov.uk' AND locations.location = 'Newcastle'
         OR users.email = 'fay.toward@rpa.gov.uk' AND locations.location = 'Newcastle'
         OR users.email = 'paul.fazackerley@rpa.gov.uk' AND locations.location = 'Newcastle'
         OR users.email = 'tim.butterworth@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'marc.solomon@rpa.gov.uk' AND locations.location = 'York'
         OR users.email = 'jonathan.drake@defra.gov.uk' AND locations.location = 'Newcastle';

    `)
  }

  static async updateStatuses () {
    await dbc.query(`
      UPDATE users
      SET statusid = statuses.statusid
      FROM statuses
      WHERE users.email = 'alan.slee@defra.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'nicholas.blows@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'paul.doyle@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'lee.gordon@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'ian.noonan@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'matthew.quinton@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'john.watson@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'scott.dormand@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'fay.toward@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'paul.fazackerley@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'tim.butterworth@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'marc.solomon@rpa.gov.uk' AND statuses.status = 'Permanent'
         OR users.email = 'jonathan.drake@defra.gov.uk' AND statuses.status = 'Permanent';

    `)
  }

  static async updateManagers () {
    await dbc.query(`
      UPDATE users A
      SET managerid = B.userid
      FROM users B
      WHERE A.email = 'alan.slee@defra.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'nicholas.blows@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'paul.doyle@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'lee.gordon@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'ian.noonan@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'matthew.quinton@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'john.watson@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'scott.dormand@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'fay.toward@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'paul.fazackerley@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'tim.butterworth@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'marc.solomon@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
         OR A.email = 'jonathan.drake@defra.gov.uk' AND B.email = 'alan.slee@defra.gov.uk';

    `)
  }

  static async createUserRoles () {
    await dbc.query(`
      INSERT INTO userroles
      SELECT users.userid, roles.roleid
      FROM users, roles
      WHERE users.email = 'alan.slee@defra.gov.uk' AND roles.role = 'Resource Manager'
         OR users.email = 'alan.slee@defra.gov.uk' AND roles.role = 'Manager'
         OR users.email = 'nicholas.blows@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'paul.doyle@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'lee.gordon@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'ian.noonan@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'matthew.quinton@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'john.watson@rpa.gov.uk' AND roles.role = 'Senior Developer'
         OR users.email = 'scott.dormand@rpa.gov.uk' AND roles.role = 'Developer'
         OR users.email = 'fay.toward@rpa.gov.uk' AND roles.role = 'Developer'
         OR users.email = 'paul.fazackerley@rpa.gov.uk' AND roles.role = 'Apprentice Developer'
         OR users.email = 'tim.butterworth@rpa.gov.uk' AND roles.role = 'Database Analyst'
         OR users.email = 'marc.solomon@rpa.gov.uk' AND roles.role = 'Database Analyst'
         OR users.email = 'jonathan.drake@defra.gov.uk' AND roles.role = 'Systems Administrator';
    `)
  }

  static async createUserSkills () {
    await dbc.query(`
      INSERT INTO userskills
      SELECT users.userid, skills.skillid
      FROM users, skills
      WHERE users.email = 'nicholas.blows@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'nicholas.blows@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'paul.doyle@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'paul.doyle@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'lee.gordon@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'lee.gordon@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'ian.noonan@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'ian.noonan@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'matthew.quinton@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'matthew.quinton@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'Node.js'
         OR users.email = 'scott.dormand@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'scott.dormand@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'C#'
         OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'Node.js'
         OR users.email = 'paul.fazackerley@rpa.gov.uk' AND skills.skill = 'Node.js'
         OR users.email = 'paul.fazackerley@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'tim.butterworth@rpa.gov.uk' AND skills.skill = 'SQL'
         OR users.email = 'marc.solomon@rpa.gov.uk' AND skills.skill = 'SQL';
    `)
  }

  static async run () {
    await this.createRoles()
    await this.createLocations()
    await this.createStatuses()
    await this.createSkills()
    await this.createUsers()
    await this.updateLocations()
    await this.updateStatuses()
    await this.updateManagers()
    await this.createUserRoles()
    await this.createUserSkills()
  }
}

Seeds.run()
