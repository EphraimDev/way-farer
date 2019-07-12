/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import config from '../config/db';

const url = process.env.BASE_URL;

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sendMail({ to, subject, message }) {
    // create reusable transporter object
    const transporter = nodemailer.createTransport(config.mail.smtpConfig);

    // setup email data
    const mailOptions = {
      from: '"Way Farer" <noreply@wayfarer.com>',
      to,
      cc: 'wayfarer@gmail.com',
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return 'failed';
      }
      return console.log(info.messageId);
    });

    return 'success';
  }

  /**
   * Sends Mail after user succesfully creates an account
   * @method createAccountMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static createAccountMessage(email) {
    const message = `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your account was created succesfully.</p>
      <p><a href='https://${url}/signin'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Create Account Successful',
      message,
    });
  }
}

export default Mailer;
