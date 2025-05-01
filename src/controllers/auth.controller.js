const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Veterinarian = require('../models/veterinarian.model');
const Groomer = require('../models/groomer.model');
const Hotel = require('../models/hotel.model');
const Caregiver = require('../models/caregiver.model');

exports.registerPetOwner = async (req, res) => {
  const { name, surname, email, phone_number, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
      phone_number,
      role: 'Owner',
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.registerVeterinarian = async (req, res) => {
  const { name, surname, email, phone_number, password, clinic_name, district, neighborhood, tax_document } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
      phone_number,
      role: 'Veterinarian',
    });

    // Add additional fields for veterinarian
    const veterinarianDetails = Veterinarian.create({
      clinic_name,
      district,
      neighborhood,
      tax_document,
      user_id: newUser.id,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token, user: newUser, veterinarian: veterinarianDetails });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.registerGroomer = async (req, res) => {
  const { name, surname, email, phone_number, password, groomer_name, district, neighborhood, lisence_document } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
      phone_number,
      role: 'Groomer',
    });

    // Add additional fields for groomer
    const groomerDetails = await Groomer.create({
      name: groomer_name,
      district,
      neighborhood,
      lisence_document,
      user_id: newUser.id,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token, user: newUser, groomer: groomerDetails });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.registerHotel = async (req, res) => {
  const { name, surname, email, phone_number, password, hotel_name, district, neighborhood, lisence_document } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
      phone_number,
      role: 'Hotel',
    });

    // Add additional fields for groomer
    const hotelDetails = await Hotel.create({
      name: hotel_name,
      district,
      neighborhood,
      lisence_document,
      user_id: newUser.id,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token, user: newUser, hotel: hotelDetails });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.registerCaregiver = async (req, res) => {
  const { name, surname, email, phone_number, password, district, neighborhood } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
      phone_number,
      role: 'Caregiver',
    });

    // Add additional fields for groomer
    const caregiverDetails = await Caregiver.create({
      district,
      neighborhood,
      user_id: newUser.id,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(201).json({ token, user: newUser, caregiver: caregiverDetails });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};