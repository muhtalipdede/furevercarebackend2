const Pet = require('../models/pet.model');

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      ...req.body,
      ownerId: req.user.userId
    });
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pet', error: error.message });
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      where: { ownerId: req.user.userId },
      include: ['owner']
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
        ownerId: req.user.userId
      },
      include: ['owner']
    });
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet', error: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const [updated] = await Pet.update(req.body, {
      where: {
        id: req.params.id,
        ownerId: req.user.userId
      }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const pet = await Pet.findByPk(req.params.id, { include: ['owner'] });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet', error: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const deleted = await Pet.destroy({
      where: {
        id: req.params.id,
        ownerId: req.user.userId
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
}; 