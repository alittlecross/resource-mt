const databaseForm = require('../../server/services/person/form')
const form = require('../../server/lib/person/form')
const support = require('../support')

const expect = require('chai').expect

describe('class Form', () => {
  let sandbox

  beforeEach(async () => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.object', () => {
    it('should return an options object', () => {
      let result = form.object()

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(0)
    })
  })

  describe('.buildObject', () => {
    it('should build, and return an options object', () => {
      let result = form.buildObject(support.getOptionsDouble().rows)

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })

  describe('.options', () => {
    it('should get options from the database, build, and return an options object', async () => {
      sandbox.stub(databaseForm, 'getOptions').returns(support.getOptionsDouble())

      let result = await form.options()

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })
})
