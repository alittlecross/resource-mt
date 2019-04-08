const DatabaseForm = require('../../server/services/person/form')
const Form = require('../../server/lib/person/form')
const Support = require('../support')

const expect = require('chai').expect

describe('class Form', () => {
  let sandbox

  beforeEach(async () => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should return an options object', () => {
      const result = new Form()

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(0)
    })
  })

  describe('.buildObject', () => {
    it('should build, and return an options object', () => {
      const result = Form.buildObject(Support.getOptionsDouble().rows)

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })

  describe('.options', () => {
    it('should get options from the database, build, and return an options object', async () => {
      sandbox.stub(DatabaseForm, 'getOptions').returns(Support.getOptionsDouble())

      const result = await Form.options()

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })
})
