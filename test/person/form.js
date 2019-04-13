const DatabaseForm = require('../../server/services/person/form')
const Form = require('../../server/lib/person/form')
const Option = require('../../server/lib/person/form/option')
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
      sandbox.createStubInstance(Option, Support.optionObjectDouble())

      const result = new Form(Support.getOptionsDouble().rows)

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })

  describe('filterData', () => {
    it('should return an array of options of one kind', () => {
      sandbox.createStubInstance(Option, Support.optionObjectDouble())

      const form = new Form([])
      const result = form.filterData(Support.getOptionsDouble().rows, 'manager')

      expect(result[0].option).equal('Michael Scott')
    })
  })

  describe('.options', () => {
    it('should get options from the database, build, and return an options object', async () => {
      sandbox.createStubInstance(Option, Support.optionObjectDouble())
      sandbox.stub(DatabaseForm, 'getOptions').returns(Support.getOptionsDouble())

      const result = await Form.options()

      expect(Object.keys(result).length).equal(6)
      expect(result.roles.length).equal(3)
    })
  })
})
