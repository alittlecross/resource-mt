const databasePerson = require('../server/services/person')
const Person = require('../server/lib/person')
const support = require('./support')

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
      const result = new Person(support.getPersonDouble().rows[0])

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(0)
      expect(result.firstName).equal('Michael')
    })
  })

  describe('.buildObject', () => {
    it('should build, and return a person object', () => {
      const result = Person.fromRows(support.getPersonDouble().rows)

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(1)
      expect(result.firstName).equal('Michael')
    })
    it('should return empty object for unknown person', () => {
      const result = Person.fromRows([])
      expect(Object.keys(result).length).equal(1)
      expect(result.skills.length).equal(0)
    })
  })

  describe('.getPerson', () => {
    it('should get person and skills from the database, build, and return a person object', async () => {
      sandbox.stub(databasePerson, 'getPerson').returns(support.getPersonDouble())

      const result = await Person.getPerson(1)

      expect(Object.keys(result).length).equal(12)
      expect(result.skills.length).equal(1)
      expect(result.firstName).equal('Michael')
    })
  })
})
