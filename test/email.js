const Email = require('../server/lib/email')

const expect = require('chai').expect
const nodemailer = require('nodemailer')

describe('class Email', () => {
  let sandbox
  let transporter

  beforeEach(() => {
    sandbox = require('sinon').createSandbox()
    transporter = {
      sendMail: () => {}
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.send', () => {
    it('should send an email', async () => {
      const createTransport = sandbox.stub(nodemailer, 'createTransport').returns(transporter)
      const sendMail = sandbox.stub(transporter, 'sendMail')

      await Email.send('michael.scott@scranton.com', 'Paper', '<div>We have run out</div>')

      expect(createTransport.callCount).equal(1)
      expect(sendMail.callCount).equal(1)
    })
  })
})
