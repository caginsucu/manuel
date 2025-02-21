const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readUsers, writeUsers } = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHelper");

const SECRET_KEY = "gizli_key";

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

  const userResponse = { ...newUser };
  delete userResponse.password;

  return successResponse(
    res,
    "Kullanıcı başarı ile oluşturuldu!",
    userResponse,
    201
  );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  // Kullanıcıyı bul
  const user = users.find((user) => user.email === email);
  if (!user) {
    return errorResponse(res, "Geçersiz e-posta veya şifre!", 400);
  }

  // Şifreyi karşılaştır
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, "Geçersiz e-posta veya şifre!", 400);
  }

  // JWT Token oluştur
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return successResponse(res, "Giriş başarılı!", { token, user }, 200);
};

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex((user) => user.id === req.user.id);

  if (userIndex === -1) {
    return errorResponse(res, "Kullanıcı bulunamadı!", 404);
  }

  const user = users[userIndex];

  // 📌 Şifre doğrulaması yap
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, "Şifre yanlış!", 400);
  }

  users.splice(userIndex, 1);
  writeUsers(users);

  return successResponse(res, "Kullanıcı başarıyla silindi!", null);
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
};
