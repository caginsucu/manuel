const express = require("express");
const router = express.Router();
const {
  validateCreateTodo,
  validateId,
  validateUpdateTodo,
} = require("../middleware/validations/todosValidation");
const verifyToken = require("../middleware/authMiddleware");

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

// CRUD İşlemleri
router.get("/", getTodos);
router.post("/", verifyToken, validateCreateTodo, addTodo);
router.put("/:id", validateUpdateTodo, validateId, updateTodo);
router.delete("/:id", validateId, deleteTodo);

module.exports = router;
