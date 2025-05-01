const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register/petowner', authController.registerPetOwner);
router.post('/register/veterinarian', authController.registerVeterinarian);
router.post('/register/groomer', authController.registerGroomer);
router.post('/register/hotel', authController.registerHotel);
router.post('/register/caregiver', authController.registerCaregiver);
router.post('/login', authController.login);

module.exports = router; 