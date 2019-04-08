const DatabasePeople = require('../server/services/people')
const People = require('../server/lib/people')
const Support = require('./support')

const expect = require('chai').expect

describe('class People', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should return a people object', () => {
      const result = new People(Support.getPeopleDouble().rows[0])

      expect(Object.keys(result).length).equal(4)
      expect(result.firstName).equal('Dwight')
    })
  })

  describe('.buildArray', () => {
    it('should build, and return a people array', () => {
      const results = People.buildArray(Support.getPeopleDouble().rows)

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })

  describe('.getPeople', () => {
    it('should get people from the database, build, and return a people array', async () => {
      sandbox.stub(DatabasePeople, 'getPeople').returns(Support.getPeopleDouble())

      const results = await People.getPeople()

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })
})
