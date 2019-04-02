const reset = require('../../server/lib/forgot-password/reset')
const databaseReset = require('../../server/services/forgot-password/reset')

const expect = require('chai').expect

describe('class Reset', () => {
  let sandbox

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.password', () => {
    it('should update the users password in the database', async () => {
      let password = sandbox.stub(databaseReset, 'password')
      let request = sandbox.stub(databaseReset, 'request')

      await reset.password('Bears', '123456')

      expect(password.callCount).equal(1)
      expect(request.callCount).equal(1)
    })
  })
})
