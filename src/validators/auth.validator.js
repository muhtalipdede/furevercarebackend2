const { body } = require('express-validator');

const registerValidation = [
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
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
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Adres en fazla 255 karakter olabilir')
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Şifre gereklidir')
];

module.exports = {
  registerValidation,
  loginValidation
}; 