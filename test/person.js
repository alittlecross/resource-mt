const DatabasePerson = require('../server/services/person')
const Person = require('../server/lib/person')
const Support = require('./support')

const expect = require('chai').expect

describe('class Person', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should return a person object', () => {
      const result = new Person(Support.getPersonDouble().rows[0])

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(0)
      expect(result.firstName).equal('Michael')
    })
  })

  describe('.buildObject', () => {
    it('should build, and return a person object', () => {
      const result = Person.buildObject(Support.getPersonDouble().rows)

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(1)
      expect(result.firstName).equal('Michael')
    })
  })

  describe('.getPerson', () => {
    it('should get person and skills from the database, build, and return a person object', async () => {
      sandbox.stub(DatabasePerson, 'getPerson').returns(Support.getPersonDouble())

      const result = await Person.getPerson(1)

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(1)
      expect(result.firstName).equal('Michael')
    })
  })
})
