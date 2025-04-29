const express = require('express');
const router = express.Router();
const hotelOwnerController = require('../controllers/hotelOwner.controller');
const { 
  registerHotelOwnerValidation, 
  updateHotelOwnerValidation, 
  getHotelOwnerByIdValidation 
} = require('../validators/hotelOwner.validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerHotelOwnerValidation, validate, hotelOwnerController.register);
router.post('/login', hotelOwnerController.login);

// Protected routes
router.use(auth);
router.get('/:id', getHotelOwnerByIdValidation, validate, hotelOwnerController.getHotelOwnerById);
router.put('/:id', updateHotelOwnerValidation, validate, hotelOwnerController.updateHotelOwner);
router.delete('/:id', getHotelOwnerByIdValidation, validate, hotelOwnerController.deleteHotelOwner);

module.exports = router; 