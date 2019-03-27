const Helper = require('../support')
const Person = require('../../lib/person')

const expect = require('chai').expect

describe('class Person', () => {
  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
  })

  describe('.object', () => {
    it('should return a user object', () => {
      let result = Person.object(Helper.databaseUserOutput().rows[0])

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.buildPeopleArray', () => {
    it('should return a people array', async () => {
      let result = await Person.buildPeopleArray(Helper.databaseUserOutput().rows)

      expect(result[0].firstName).equal('Michael')
    })
  })

  describe('.add', () => {
    it('should create records in the users, userroles, and userskills tables (no skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataZero())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(1)
    })

    it('should create records in the users, userroles, and userskills tables (one skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataOne())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(2)
    })

    it('should create records in the users, userroles, and userskills tables (multi skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataMulti())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(3)
    })
  })

  describe('.getEveryone', () => {
    it('should return a people array', async () => {
      await Helper.createUsers()

      let result = await Person.getEveryone()

      expect(result.length).equal(2)
    })
  })

  describe('.alreadyExists', () => {
    it(`should return false if person doesn't already exist`, async () => {
      let result = await Person.alreadyExists({ email: 'michael.scott@scranton.com' })

      expect(result.status).equal(false)
    })

    it(`should return true if person already exists`, async () => {
      await Helper.createUsers()

      let result = await Person.alreadyExists({ email: 'michael.scott@scranton.com' })

      expect(result.status).equal(true)
    })
  })
})
