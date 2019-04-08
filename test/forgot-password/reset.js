const DatabaseReset = require('../../server/services/forgot-password/reset')
const Reset = require('../../server/lib/forgot-password/reset')

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
      const password = sandbox.stub(DatabaseReset, 'password')
      const request = sandbox.stub(DatabaseReset, 'request')

      await Reset.password('Bears', '123456')

      expect(password.callCount).equal(1)
      expect(request.callCount).equal(1)
    })
  })
})
