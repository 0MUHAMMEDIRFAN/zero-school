const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/Notification');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/notifications', notificationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));