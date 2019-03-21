const dbc = require('./database-connection')
const directory = './db/migrations/'
const fs = require('fs')

class Migrations {
  static async migrationsTableExists () {
    let result = await dbc.query(`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'migrations'
      );
    `)
    return result.rows[0].exists
  }

  static async createMigrationsTable () {
    if (!await this.migrationsTableExists()) {
      await dbc.query(`
        CREATE TABLE migrations (
          id SERIAL PRIMARY KEY,
          script varchar(50),
          createdat timestamptz NOT NULL DEFAULT NOW()
        );
      `)
      if (!process.env.PKDATABASE.includes('test')) {
        console.log('00_migrations.sql')
      }
    }
  }

  static updateTravisYml (scripts) {
    let travis = fs.readFileSync('./.travis.yml', 'utf8')
    let lines = travis.split('\n')
    travis = ''
    for (let i = 0; i < 10; i++) {
      travis += lines[i] + '\n'
    }
    lines.push('  - psql -d ketchup_test')
    for (let script of scripts) {
      travis += `  - psql -d ketchup_test -f ${directory + script} \n`
    }
    fs.writeFileSync('./.travis.yml', travis, 'utf8')
  }

  static async scriptAlreadyRan (script) {
    let result = await dbc.query(`
      SELECT *
      FROM migrations
      WHERE script = $1;
    `, [script])
    return result.rowCount === 0
  }

  static async updateMigrationsTable (script) {
    await dbc.query(`
      INSERT INTO migrations (script)
      VALUES ($1);
    `, [script])
  }

  static async run () {
    await this.createMigrationsTable()
    let scripts = []
    fs.readdirSync(directory).forEach(file => {
      scripts.push(file)
    })
    this.updateTravisYml(scripts)
    for (let script of scripts) {
      if (await this.scriptAlreadyRan(script)) {
        let sql = fs.readFileSync(directory + script).toString()
        await dbc.query(sql)
        await this.updateMigrationsTable(script)
        if (!process.env.PKDATABASE.includes('test')) {
          console.log(script)
        }
      }
    }
  }
}

module.exports = Migrations
