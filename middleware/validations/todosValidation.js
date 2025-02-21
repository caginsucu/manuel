const { body, param } = require("express-validator");
const { validateRequest } = require("../../utils/validation");

const validateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title boş olamaz!")
    .isLength({ min: 3 })
    .withMessage("Title en az 3 karakter olmalı!"),
  validateRequest,
];
const validateId = [
  param("id").isUUID().withMessage("Geçerli bir UUID giriniz!"),
  validateRequest,
];

module.exports = { validateTodo, validateId };
