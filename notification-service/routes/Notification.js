const express = require('express');
const Notification = require('../models/Notification');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, type, message } = req.body;
    try {
        const notification = await Notification.create({ userId, type, message });
        if (type === 'email') {
            await emailService.sendEmail(userId, message)
        } else if (type === 'sms') {
            await smsService.sendSMS(userId, message);
        }
        notification.status = 'sent';
        await notification.save();
        res.status(200).json({ success: true, notification })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})


module.exports = router;