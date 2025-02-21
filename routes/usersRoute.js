const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/userController");

// verify token
const verifyToken = require("../middleware/authMiddleware");

const {
  validateRegister,
  validateLogin,
  validateDeleteUser,
} = require("../middleware/validations/usersValidation");

// CRUD İşlemleri
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.delete("/", verifyToken, validateDeleteUser, deleteUser);

module.exports = router;
