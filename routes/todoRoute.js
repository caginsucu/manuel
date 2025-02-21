const express = require("express");
const router = express.Router();
const {
  validateTodo,
  validateId,
} = require("../middleware/validations/todosValidation");

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

// CRUD İşlemleri
router.get("/", getTodos);
router.post("/", validateTodo, addTodo);
router.put("/:id", validateId, updateTodo);
router.delete("/:id", validateId, deleteTodo);

module.exports = router;
