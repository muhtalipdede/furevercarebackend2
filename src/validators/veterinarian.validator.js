const { body, param } = require('express-validator');

const registerVeterinarianValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Ad 2-50 karakter arasında olmalıdır'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Soyad 2-50 karakter arasında olmalıdır'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phoneNumber')
    .trim()
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Geçerli bir telefon numarası giriniz'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır')
    .matches(/\d/)
    .withMessage('Şifre en az bir rakam içermelidir')
    .matches(/[a-z]/)
    .withMessage('Şifre en az bir küçük harf içermelidir')
    .matches(/[A-Z]/)
    .withMessage('Şifre en az bir büyük harf içermelidir')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Şifre en az bir özel karakter içermelidir'),
  
  body('specialization')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Uzmanlık alanı 2-100 karakter arasında olmalıdır'),
  
  body('clinicId')
    .isInt()
    .withMessage('Geçerli bir klinik ID giriniz')
];

const updateVeterinarianValidation = [
  param('id')
    .isInt()
    .withMessage('Geçerli bir ID giriniz'),
  
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Ad 2-50 karakter arasında olmalıdır'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Soyad 2-50 karakter arasında olmalıdır'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phoneNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Geçerli bir telefon numarası giriniz'),
  
  body('specialization')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Uzmanlık alanı 2-100 karakter arasında olmalıdır'),
  
  body('clinicId')
    .optional()
    .isInt()
    .withMessage('Geçerli bir klinik ID giriniz')
];

const getVeterinarianByIdValidation = [
  param('id')
    .isInt()
    .withMessage('Geçerli bir ID giriniz')
];

module.exports = {
  registerVeterinarianValidation,
  updateVeterinarianValidation,
  getVeterinarianByIdValidation
}; 