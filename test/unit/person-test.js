const Helper = require('../support/person-helpers')
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
})
