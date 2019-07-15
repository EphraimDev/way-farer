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
  static async sendMail({ to, subject, message}) {

    // setup email data
    const mailOptions = {
      from: '"Way Farer" <noreply@wayfarer.com>',
      to,
      cc: 'wayfarer@gmail.com',
      subject,
      html: message,
    };

    const transporter = nodemailer.createTransport(config.mail.smtpConfig);

    let result;
    await transporter.sendMail(mailOptions, (error, info) => {
      console.log(1)
      console.log(error, info)
      if (error) {
        result = 'failed';
      }else{
        result = info.messageId;
      }
      
    });
    console.log(result)
    return result;
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
      message
    });
  }
}

export default Mailer;
