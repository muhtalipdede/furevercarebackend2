const { body, param } = require('express-validator');

const createPetValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('İsim 2-50 karakter arasında olmalıdır'),
  
  body('type')
    .isIn(['dog', 'cat', 'bird', 'other'])
    .withMessage('Geçerli bir evcil hayvan türü seçiniz'),
  
  body('breed')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Irk 2-50 karakter arasında olmalıdır'),
  
  body('age')
    .isInt({ min: 0, max: 30 })
    .withMessage('Yaş 0-30 arasında olmalıdır'),
  
  body('numberOfAnimals')
    .isInt({ min: 1, max: 10 })
    .withMessage('Hayvan sayısı 1-10 arasında olmalıdır'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Açıklama en fazla 500 karakter olabilir')
];

const updatePetValidation = [
  param('id')
    .isInt()
    .withMessage('Geçerli bir ID giriniz'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('İsim 2-50 karakter arasında olmalıdır'),
  
  body('type')
    .optional()
    .isIn(['dog', 'cat', 'bird', 'other'])
    .withMessage('Geçerli bir evcil hayvan türü seçiniz'),
  
  body('breed')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Irk 2-50 karakter arasında olmalıdır'),
  
  body('age')
    .optional()
    .isInt({ min: 0, max: 30 })
    .withMessage('Yaş 0-30 arasında olmalıdır'),
  
  body('numberOfAnimals')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Hayvan sayısı 1-10 arasında olmalıdır'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Açıklama en fazla 500 karakter olabilir')
];

const getPetByIdValidation = [
  param('id')
    .isInt()
    .withMessage('Geçerli bir ID giriniz')
];

module.exports = {
  createPetValidation,
  updatePetValidation,
  getPetByIdValidation
}; 