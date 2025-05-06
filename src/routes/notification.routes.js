const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', notificationController.getAllNotifications);

module.exports = router; 