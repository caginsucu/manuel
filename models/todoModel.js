const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/todos.json");

//JSON Dosyasını okuma için

const readTodos = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeTodos = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  readTodos,
  writeTodos,
};
