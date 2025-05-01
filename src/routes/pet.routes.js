const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', petController.getAllPets);
router.post('/', petController.createPet);

module.exports = router; 