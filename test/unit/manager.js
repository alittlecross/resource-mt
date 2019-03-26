const Helper = require('../support')
const Manager = require('../../lib/manager')
const Person = require('../../lib/person')

const expect = require('chai').expect

describe('class Manager', () => {
  let sandbox

  beforeEach(async () => {
    await Helper.changeEnvironment()
    await Helper.truncateDatabase()

    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.getTeam', () => {
    it('a manager should return a people array', async () => {
      await Helper.createUsers()

      sandbox.stub(Person, 'buildPersonObjects').returns(Helper.peopleArrayDouble())

      let result = await Manager.getTeam({ userId: '1' })

      expect(result.length).greaterThan(0)
    })

    it('a non-manager should not return a people array', async () => {
      await Helper.createUsers()

      let result = await Manager.getTeam({ userId: '2' })

      expect(result.length).equal(0)
    })
  })
})
