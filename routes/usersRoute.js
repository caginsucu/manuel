const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");
const {
  validateRegister,
} = require("../middleware/validations/usersValidation");
const { validateRequest } = require("../utils/validation");

// CRUD İşlemleri
router.post("/register", validateRegister, validateRequest, registerUser);
router.post("/login");

module.exports = router;
