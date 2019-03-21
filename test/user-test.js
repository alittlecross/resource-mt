const Helper = require('./test-helpers')
const User = require('../lib/user')

const expect = require('chai').expect

describe('User', () => {
  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.runMigrations()
    await Helper.truncateDatabase()
  })

  describe('.userObejct', () => {
    it('should return a user object', () => {
      let result = User.userObject(Helper.databaseUserOutput().rows[0])

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.getProfile', () => {
    it('should return a user record from the database', async () => {
      await Helper.createUser()

      let result = await User.getProfile('michael.scott@scranton.com')

      expect(result.rows[0].firstname).equal('Michael')
    })
  })

  describe('.buildUserObject', () => {
    it('should return a user object', async () => {
      let result = await User.buildUserObject(Helper.databaseUserOutput().rows)

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.logIn', () => {
    it('correct email and password should be successful', async () => {
      await Helper.createUser()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'password' })

      expect(result.status).equal(true)
    })

    it('incorrect email should be unsuccessful', async () => {
      await Helper.createUser()

      let result = await User.logIn({ email: 'michael@scranton.com', password: 'password' })

      expect(result.status).equal(false)
    })

    it('incorrect password should be unsuccessful', async () => {
      await Helper.createUser()

      let result = await User.logIn({ email: 'michael.scott@scranton.com', password: 'incorrect' })

      expect(result.status).equal(false)
    })
  })
})
