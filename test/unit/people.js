const databasePeople = require('../../server/services/people')
const people = require('../../server/lib/people')
const support = require('../support')

const expect = require('chai').expect

describe('class People', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.object', () => {
    it('should return a people object', () => {
      let result = people.object(support.getPeopleDouble().rows[0])

      expect(Object.keys(result).length).equal(4)
      expect(result.firstName).equal('Dwight')
    })
  })

  describe('.buildArray', () => {
    it('should build, and return a people array', () => {
      let results = people.buildArray(support.getPeopleDouble().rows)

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })

  describe('.getPeople', () => {
    it('should get people from the database, build, and return a people array', async () => {
      sandbox.stub(databasePeople, 'getPeople').returns(support.getPeopleDouble())

      let results = await people.getPeople()

      expect(results.length).equal(2)
      expect(Object.keys(results[0]).length).equal(4)
      expect(results[0].firstName).equal('Dwight')
    })
  })
})
