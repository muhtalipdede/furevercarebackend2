const jwt = require('jsonwebtoken');
const HotelOwner = require('../models/hotelOwner.model');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, taxNumber } = req.body;

    // Check if hotel owner already exists
    const existingHotelOwner = await HotelOwner.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }, { taxNumber }]
      }
    });

    if (existingHotelOwner) {
      return res.status(400).json({ message: 'Hotel owner already exists' });
    }

    // Create new hotel owner
    const hotelOwner = await HotelOwner.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      taxNumber
    });

    // Generate token
    const token = jwt.sign(
      { hotelOwnerId: hotelOwner.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Hotel owner registered successfully',
      token,
      hotelOwner: {
        id: hotelOwner.id,
        firstName: hotelOwner.firstName,
        lastName: hotelOwner.lastName,
        email: hotelOwner.email,
        phoneNumber: hotelOwner.phoneNumber,
        taxNumber: hotelOwner.taxNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering hotel owner', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find hotel owner
    const hotelOwner = await HotelOwner.findOne({ where: { email } });
    if (!hotelOwner) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await hotelOwner.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { hotelOwnerId: hotelOwner.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      hotelOwner: {
        id: hotelOwner.id,
        firstName: hotelOwner.firstName,
        lastName: hotelOwner.lastName,
        email: hotelOwner.email,
        phoneNumber: hotelOwner.phoneNumber,
        taxNumber: hotelOwner.taxNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getHotelOwnerById = async (req, res) => {
  try {
    const hotelOwner = await HotelOwner.findByPk(req.params.id);
    if (!hotelOwner) {
      return res.status(404).json({ message: 'Hotel owner not found' });
    }
    res.json(hotelOwner);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel owner', error: error.message });
  }
};

exports.updateHotelOwner = async (req, res) => {
  try {
    const [updated] = await HotelOwner.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Hotel owner not found' });
    }

    const hotelOwner = await HotelOwner.findByPk(req.params.id);
    res.json(hotelOwner);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel owner', error: error.message });
  }
};

exports.deleteHotelOwner = async (req, res) => {
  try {
    const deleted = await HotelOwner.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Hotel owner not found' });
    }

    res.json({ message: 'Hotel owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel owner', error: error.message });
  }
}; 