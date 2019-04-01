const email = require('../../server/lib/email')
const nodemailer = require('nodemailer')

const expect = require('chai').expect

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
      let createTransport = sandbox.stub(nodemailer, 'createTransport').returns(transporter)
      let sendMail = sandbox.stub(transporter, 'sendMail')

      await email.send('michael.scott@scranton.com', 'Paper', '<div>We have run out</div>')

      expect(createTransport.callCount).equal(1)
      expect(sendMail.callCount).equal(1)
    })
  })
})
