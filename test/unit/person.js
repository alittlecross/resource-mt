const Helper = require('../support')
const Person = require('../../lib/person')

const expect = require('chai').expect

describe('class Person', () => {
  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()
  })

  describe('.object', () => {
    it('should return a person object', () => {
      let result = Person.object(Helper.databaseUserOutputOne().rows[0])

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.buildPeopleArray', () => {
    it('should return a people array', async () => {
      let result = await Person.buildPeopleArray(Helper.databaseUserOutputOne().rows)

      expect(result[0].firstName).equal('Michael')
    })
  })

  describe('.buildPersonObject', () => {
    it('should return a person object', async () => {
      let result = await Person.buildPersonObject(Helper.databaseUserOutputTwo().rows)

      expect(result.firstName).equal('Michael')
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

  describe('.getOne', () => {
    it('should return a person object', async () => {
      await Helper.createUsers()

      let result = await Person.getOne(1)

      expect(result.firstName).equal('Michael')
    })
  })

  describe('.getEveryone', () => {
    it('should return a people array', async () => {
      await Helper.createUsers()

      let result = await Person.getEveryone()

      expect(result.length).equal(2)
    })
  })

  describe('.add', () => {
    it('should create a record in the users table', async () => {
      await Helper.createUsers()

      let results = await Person.add(Helper.addFormDataZero())

      expect(results[0].command).equal('INSERT')
      expect(results[0].rowCount).equal(1)
    })
  })

  describe('.update', () => {
    it('should update a record in the users table', async () => {
      await Helper.createUsers()

      let results = await Person.update(Helper.updateFormData())

      expect(results[0].command).equal('UPDATE')
      expect(results[0].rowCount).equal(1)
    })
  })

  describe('.skills', () => {
    it('should create a record in the skills table', async () => {
      await Helper.createUsers()
      let data = { skills: 3 }

      let result = await Person.skills(data, 1)

      expect(result.command).equal('INSERT')
      expect(result.rowCount).equal(1)
    })

    it('should create records in the skills table', async () => {
      await Helper.createUsers()
      let data = { skills: [2, 3] }

      let results = await Person.skills(data, 1)

      expect(results.length).equal(2)
      expect(results[0].command).equal('INSERT')
      expect(results[0].rowCount).equal(1)
    })
  })

  describe('.report', () => {
    it('should return an array of three objects', () => {
      let person = 'A'
      let results = ['B', 'C']

      let result = Person.report(person, results)

      expect(result.length).equal(3)
    })

    it('should return an array of two objects', () => {
      let person = 'A'
      let results = 'B'

      let result = Person.report(person, results)

      expect(result.length).equal(2)
    })
  })
})
