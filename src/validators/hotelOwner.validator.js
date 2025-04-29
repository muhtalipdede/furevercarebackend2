const { body, param } = require('express-validator');

const registerHotelOwnerValidation = [
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
  
  body('taxNumber')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Geçerli bir vergi numarası giriniz (10 haneli)')
];

const updateHotelOwnerValidation = [
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
  
  body('taxNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Geçerli bir vergi numarası giriniz (10 haneli)')
];

const getHotelOwnerByIdValidation = [
  param('id')
    .isInt()
    .withMessage('Geçerli bir ID giriniz')
];

module.exports = {
  registerHotelOwnerValidation,
  updateHotelOwnerValidation,
  getHotelOwnerByIdValidation
}; 