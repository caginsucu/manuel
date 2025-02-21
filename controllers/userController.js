const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { readUsers, writeUsers } = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHelper");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  // E-posta zaten var mı kontrol et ???
  if (users.some((user) => user.email === email)) {
    return errorResponse(res, "Bu e-posta zaten kullanılıyor!", 400);
  }

  // Şifreyi hashle
  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPwd,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return successResponse(
    res,
    "Kullanıcı başarı ile oluşturuldu!",
    newUser,
    201
  );
};

module.exports = {
  registerUser,
};
