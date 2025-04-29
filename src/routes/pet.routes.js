const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { 
  createPetValidation, 
  updatePetValidation, 
  getPetByIdValidation 
} = require('../validators/pet.validator');

router.use(auth); // Apply auth middleware to all routes

router.post('/', createPetValidation, validate, petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', getPetByIdValidation, validate, petController.getPetById);
router.put('/:id', updatePetValidation, validate, petController.updatePet);
router.delete('/:id', getPetByIdValidation, validate, petController.deletePet);

module.exports = router; 