const jwt = require('jsonwebtoken');
const Caregiver = require('../models/caregiver.model');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, experience, hourlyRate, bio, services } = req.body;

    // Check if caregiver already exists
    const existingCaregiver = await Caregiver.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }]
      }
    });

    if (existingCaregiver) {
      return res.status(400).json({ message: 'Caregiver already exists' });
    }

    // Create new caregiver
    const caregiver = await Caregiver.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      experience,
      hourlyRate,
      bio,
      services
    });

    // Generate token
    const token = jwt.sign(
      { caregiverId: caregiver.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Caregiver registered successfully',
      token,
      caregiver: {
        id: caregiver.id,
        firstName: caregiver.firstName,
        lastName: caregiver.lastName,
        email: caregiver.email,
        phoneNumber: caregiver.phoneNumber,
        experience: caregiver.experience,
        hourlyRate: caregiver.hourlyRate,
        availability: caregiver.availability,
        bio: caregiver.bio,
        services: caregiver.services
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering caregiver', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const caregiver = await Caregiver.findByPk(id);
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Update caregiver information
    await caregiver.update(updates);

    res.json({
      message: 'Profile updated successfully',
      caregiver: {
        id: caregiver.id,
        firstName: caregiver.firstName,
        lastName: caregiver.lastName,
        email: caregiver.email,
        phoneNumber: caregiver.phoneNumber,
        experience: caregiver.experience,
        hourlyRate: caregiver.hourlyRate,
        availability: caregiver.availability,
        bio: caregiver.bio,
        services: caregiver.services
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const caregiver = await Caregiver.findByPk(id);

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    res.json({
      caregiver: {
        id: caregiver.id,
        firstName: caregiver.firstName,
        lastName: caregiver.lastName,
        email: caregiver.email,
        phoneNumber: caregiver.phoneNumber,
        experience: caregiver.experience,
        hourlyRate: caregiver.hourlyRate,
        availability: caregiver.availability,
        bio: caregiver.bio,
        services: caregiver.services
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
}; 