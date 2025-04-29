const express = require('express');
const router = express.Router();
const veterinarianController = require('../controllers/veterinarian.controller');
const { 
  registerVeterinarianValidation, 
  updateVeterinarianValidation, 
  getVeterinarianByIdValidation 
} = require('../validators/veterinarian.validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerVeterinarianValidation, validate, veterinarianController.register);
router.post('/login', veterinarianController.login);

// Protected routes
router.use(auth);
router.get('/:id', getVeterinarianByIdValidation, validate, veterinarianController.getVeterinarianById);
router.put('/:id', updateVeterinarianValidation, validate, veterinarianController.updateVeterinarian);
router.delete('/:id', getVeterinarianByIdValidation, validate, veterinarianController.deleteVeterinarian);

module.exports = router; 