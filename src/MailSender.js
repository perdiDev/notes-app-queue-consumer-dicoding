const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transforter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    const message = {
      from: 'Notes App',
      to: targetEmail,
      subject: 'Export Catatan',
      text: 'Terlampir hasil dari ekspor catatan',
      attachments: [
        {
          filename: 'notes.json',
          content,
        },
      ],
    };

    return this._transforter.sendMail(message);
  }
}

module.exports = MailSender;
