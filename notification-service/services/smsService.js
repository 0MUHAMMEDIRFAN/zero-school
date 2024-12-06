const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSMS = async (userId, message) => {
    await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userId
    });
}