const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

//JSON Dosyasını okuma için

const readUsers = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  readUsers,
  writeUsers,
};
