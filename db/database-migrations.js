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
      console.log('00_migrations.sql')
    }
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
    for (let script of scripts) {
      if (await this.scriptAlreadyRan(script)) {
        let sql = fs.readFileSync(`./db/migrations/${script}`).toString()
        await dbc.query(sql)
        await this.updateMigrationsTable(script)
        console.log(script)
      }
    }
  }
}

Migrations.run()
