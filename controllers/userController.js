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

  return successResponse(
    res,
    "Kullanıcı başarı ile oluşturuldu!",
    newUser,
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

module.exports = {
  registerUser,
  loginUser,
};
