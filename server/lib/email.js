const nodemailer = require('nodemailer')

class Email {
  static async send (to, subject, html) {
    const transporter = nodemailer.createTransport({
      host: process.env.NMHOST,
      port: process.env.NMPORT,
      secure: false,
      auth: {
        user: process.env.NMUSER,
        pass: process.env.NMPASS
      }
    })

    const mailOptions = {
      from: process.env.NMUSER,
      to: to,
      subject: subject,
      html: html
    }

    await transporter.sendMail(mailOptions)
  }
}

module.exports = Email
