const Helper = require('../support')
const Options = require('../../lib/options')

const expect = require('chai').expect

describe('class Options', () => {
  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
  })

  describe('.optionsObject', () => {
    it('should return an empty options object', () => {
      let result = Options.optionsObject()

      expect(Object.keys(result).length).equal(5)
      expect(result.roles.length).equal(0)
    })
  })

  describe('.buildOptionsObject', () => {
    it('should return a full options object', () => {
      let result = Options.buildOptionsObject(Helper.databaseOptionsOutput().rows)

      expect(Object.keys(result).length).equal(5)
      expect(result.roles.length).equal(4)
    })
  })

  describe('.addPerson', () => {
    it('should return a full options object', async () => {
      await Helper.createUsers()

      let result = await Options.addPerson()

      expect(Object.keys(result).length).equal(5)
      expect(result.roles.length).equal(3)
    })
  })
})
