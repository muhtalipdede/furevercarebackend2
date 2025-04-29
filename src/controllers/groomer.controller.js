const jwt = require('jsonwebtoken');
const Groomer = require('../models/groomer.model');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, taxNumber } = req.body;

    // Check if groomer already exists
    const existingGroomer = await Groomer.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }, { taxNumber }]
      }
    });

    if (existingGroomer) {
      return res.status(400).json({ message: 'Groomer already exists' });
    }

    // Create new groomer
    const groomer = await Groomer.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      taxNumber
    });

    // Generate token
    const token = jwt.sign(
      { groomerId: groomer.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Groomer registered successfully',
      token,
      groomer: {
        id: groomer.id,
        firstName: groomer.firstName,
        lastName: groomer.lastName,
        email: groomer.email,
        phoneNumber: groomer.phoneNumber,
        taxNumber: groomer.taxNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering groomer', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find groomer
    const groomer = await Groomer.findOne({ where: { email } });
    if (!groomer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await groomer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { groomerId: groomer.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      groomer: {
        id: groomer.id,
        firstName: groomer.firstName,
        lastName: groomer.lastName,
        email: groomer.email,
        phoneNumber: groomer.phoneNumber,
        taxNumber: groomer.taxNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getGroomerById = async (req, res) => {
  try {
    const groomer = await Groomer.findByPk(req.params.id);
    if (!groomer) {
      return res.status(404).json({ message: 'Groomer not found' });
    }
    res.json(groomer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groomer', error: error.message });
  }
};

exports.updateGroomer = async (req, res) => {
  try {
    const [updated] = await Groomer.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Groomer not found' });
    }

    const groomer = await Groomer.findByPk(req.params.id);
    res.json(groomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating groomer', error: error.message });
  }
};

exports.deleteGroomer = async (req, res) => {
  try {
    const deleted = await Groomer.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Groomer not found' });
    }

    res.json({ message: 'Groomer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting groomer', error: error.message });
  }
}; 