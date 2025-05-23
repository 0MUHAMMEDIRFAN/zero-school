const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['email', 'sms'], required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['sent', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationSchema);