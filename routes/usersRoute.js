const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validations/usersValidation");

// CRUD İşlemleri
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
