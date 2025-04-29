const express = require('express');
const router = express.Router();
const groomerController = require('../controllers/groomer.controller');
const { 
  registerGroomerValidation, 
  updateGroomerValidation, 
  getGroomerByIdValidation 
} = require('../validators/groomer.validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerGroomerValidation, validate, groomerController.register);
router.post('/login', groomerController.login);

// Protected routes
router.use(auth);
router.get('/:id', getGroomerByIdValidation, validate, groomerController.getGroomerById);
router.put('/:id', updateGroomerValidation, validate, groomerController.updateGroomer);
router.delete('/:id', getGroomerByIdValidation, validate, groomerController.deleteGroomer);

module.exports = router; 