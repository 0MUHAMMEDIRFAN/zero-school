const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

exports.sendEmail = async (userId, message) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: userId,
        subject: "Notification",
        text: message,
    }
    await transporter.sendMail(mailOptions);
}