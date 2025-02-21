const { readTodos, writeTodos } = require("../models/todoModel");
const { successResponse, errorResponse } = require("../utils/responseHelper");
const { v4: uuidv4 } = require("uuid");

// 📌 Tüm todo'ları getir
const getTodos = (req, res) => {
  const todos = readTodos();
  successResponse(res, "Todolar getirildi.", todos, 200);
};

// 📌 Yeni todo ekle
const addTodo = (req, res) => {
  const todos = readTodos();
  const { title } = req.body;

  const newTodo = {
    id: uuidv4(),
    title: title.trim(),
    isCompleted: false,
    createdAt: new Date().toISOString(), // 📌 Eklenen tarih (ISO format)
    updatedAt: new Date().toISOString(), // 📌 Güncellenme tarihi
    priority: "normal", // 📌 Öncelik seviyesi (low, normal, high)
    category: "genel", // 📌 Kategori (iş, kişisel, alışveriş vb.)
    dueDate: null, // 📌 Son tamamlama tarihi (isteğe bağlı)
    description: "", // 📌 Açıklama (isteğe bağlı)
    userId: req.user.id,
  };

  todos.push(newTodo);
  writeTodos(todos);

  return successResponse(res, "Yeni todo oluşturuldu", newTodo, 201);
};

// 📌 Todo güncelle
const updateTodo = (req, res) => {
  const id = req.params.id;
  const todos = readTodos();

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ success: false, message: "Todo bulunamadı" });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
    updatedAt: new Date().toISOString(), // 📌 Güncellenme tarihi değiştirildi
  };

  writeTodos(todos);
  return successResponse(res, "Todo güncellendi", todos[todoIndex]);
};

// 📌 Todo sil
const deleteTodo = (req, res) => {
  const todos = readTodos();
  const id = req.params.id;

  if (!todos.some((todo) => todo.id === id)) {
    return res.status(404).json({ error: "Todo bulunamadı!" });
  }

  const newTodos = todos.filter((todo) => todo.id !== id);
  writeTodos(newTodos);
  return successResponse(res, "Todo başarıyla silindi!", newTodos, 200);
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
