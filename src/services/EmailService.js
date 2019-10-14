const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = this._setup();
    this.from = '"Palitras" <info@palitras.com>';
  }

  sendConfirmation(user, token) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Welcome to Palitras",
      html: `<p>Welcome to Palitras, please confirm your email</p>
      <a href=${user.generateConfirmationUrl(token.value)}>Confirm</a>`
    };
    return this.transporter.sendMail(email);
  }

  sendResetPassword(user, token) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Reset password",
      html: `<p>you can reset password by following this link below</p>
      <a href=${user.generateResetPasswordUrl(token.value)}>Reset password</a>`
    };

    return this.transporter.sendMail(email);
  }

  sendTestMail(userEmail, text) {
    const email = {
      from: this.from,
      to: userEmail,
      subject: "Test mail",
      html: `<p>${text}</p>`
    };

    return this.transporter.sendMail(email);
  }

  _setup() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
}

module.exports = new EmailService();
