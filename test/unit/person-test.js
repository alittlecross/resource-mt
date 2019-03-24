const Helper = require('../test-helpers')
const Person = require('../../lib/person')

const expect = require('chai').expect

describe('class Person', () => {
  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
  })

  describe('.personObejct', () => {
    it('should return a user object', () => {
      let result = Person.personObject(Helper.databaseUserOutput().rows[0])

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.buildPersonObjects', () => {
    it('should return a people array', async () => {
      let result = await Person.buildPersonObjects(Helper.databaseUserOutput().rows)

      expect(result[0].firstName).equal('Michael')
    })
  })

  describe('.add', () => {
    it('should create records in the users, userroles, and userskills tables (no role, no skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataZero())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(1)
    })

    it('should create records in the users, userroles, and userskills tables (one role, one skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataOne())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(3)
    })

    it('should create records in the users, userroles, and userskills tables (multi role, multi skill)', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataMulti())

      let success = []
      let sum = (a, b) => a + b

      results.forEach((result) => {
        success.push(result.rowCount)
      })

      expect(success.reduce(sum)).equal(5)
    })
  })
})
