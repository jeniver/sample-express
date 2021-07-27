const BaseProvider = require("./BaseProvider");
const nodemailer = require("nodemailer");

class SmtpProvider extends BaseProvider {

    constructor(emailService) {
        super(emailService)
        this.transporter = null;
        this.setupTransporter()
    }

    setupTransporter() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_PORT === 465, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USERNAME, // generated ethereal user
              pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
    }

    async send() {
        const body = this.emailService._getBodyContent()
        const info = await this.transporter.sendMail({
            from: {name: this.emailService._fromName, address: this.emailService._fromEmail}, // sender address
            to: this.emailService._recipients, // list of receivers
            subject: this.emailService._subject, // Subject line
            text: !this.emailService._html? body: null, // plain text body
            html: this.emailService._html? body: null,
        });

        console.log("SMTP Message sent: %s", info.messageId);
    }
}

module.exports = SmtpProvider