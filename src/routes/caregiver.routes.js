const express = require('express');
const router = express.Router();
const caregiverController = require('../controllers/caregiver.controller');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', caregiverController.register);

// Protected routes
router.get('/profile/:id', auth, caregiverController.getProfile);
router.put('/profile/:id', auth, caregiverController.updateProfile);

module.exports = router; 