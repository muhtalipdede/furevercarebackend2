const jwt = require('jsonwebtoken');
const Veterinarian = require('../models/veterinarian.model');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, specialization, clinicId } = req.body;

    // Check if veterinarian already exists
    const existingVeterinarian = await Veterinarian.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }]
      }
    });

    if (existingVeterinarian) {
      return res.status(400).json({ message: 'Veterinarian already exists' });
    }

    // Create new veterinarian
    const veterinarian = await Veterinarian.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      specialization,
      clinicId
    });

    // Generate token
    const token = jwt.sign(
      { veterinarianId: veterinarian.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Veterinarian registered successfully',
      token,
      veterinarian: {
        id: veterinarian.id,
        firstName: veterinarian.firstName,
        lastName: veterinarian.lastName,
        email: veterinarian.email,
        phoneNumber: veterinarian.phoneNumber,
        specialization: veterinarian.specialization,
        clinicId: veterinarian.clinicId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering veterinarian', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find veterinarian
    const veterinarian = await Veterinarian.findOne({ where: { email } });
    if (!veterinarian) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await veterinarian.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { veterinarianId: veterinarian.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      veterinarian: {
        id: veterinarian.id,
        firstName: veterinarian.firstName,
        lastName: veterinarian.lastName,
        email: veterinarian.email,
        phoneNumber: veterinarian.phoneNumber,
        specialization: veterinarian.specialization,
        clinicId: veterinarian.clinicId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getVeterinarianById = async (req, res) => {
  try {
    const veterinarian = await Veterinarian.findByPk(req.params.id);
    if (!veterinarian) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }
    res.json(veterinarian);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching veterinarian', error: error.message });
  }
};

exports.updateVeterinarian = async (req, res) => {
  try {
    const [updated] = await Veterinarian.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    const veterinarian = await Veterinarian.findByPk(req.params.id);
    res.json(veterinarian);
  } catch (error) {
    res.status(500).json({ message: 'Error updating veterinarian', error: error.message });
  }
};

exports.deleteVeterinarian = async (req, res) => {
  try {
    const deleted = await Veterinarian.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    res.json({ message: 'Veterinarian deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting veterinarian', error: error.message });
  }
}; 