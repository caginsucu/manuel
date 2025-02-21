const { body, param } = require("express-validator");
const { validateRequest } = require("../../utils/validation");

const validateCreateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title boş olamaz!")
    .isLength({ min: 3 })
    .withMessage("Title en az 3 karakter olmalı!"),
  validateRequest,
];

const validateUpdateTodo = [
  body("title")
    .optional() // Title zorunlu değil
    .isLength({ min: 3 })
    .withMessage("Title en az 3 karakter olmalı!"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted boolean olmalıdır"),
  validateRequest,
];

const validateId = [
  param("id").isUUID().withMessage("Geçerli bir UUID giriniz!"),
  validateRequest,
];

module.exports = { validateCreateTodo, validateUpdateTodo, validateId };
