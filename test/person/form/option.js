const Option = require('../../../server/lib/person/form/option')

const expect = require('chai').expect

describe('class Option', () => {
  describe('constructor', () => {
    it('should return an option object', () => {
      const result = new Option({ optionid: 42, option: `Don't Panic` })

      expect(result.optionId).equal(42)
    })
  })
})
