const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHelper");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return errorResponse(res, "Token eksik!", null, 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return errorResponse(res, "Geçersiz token formatı!", null, 401);
  }

  jwt.verify(token, "gizli_key", (err, decoded) => {
    if (err) {
      return errorResponse(
        res,
        "Yetkisiz erişim! Token geçersiz veya süresi dolmuş.",
        null,
        403
      );
    }

    req.user = decoded; // 📌 Token doğrulandı, kullanıcı bilgisi req.user içine eklendi!
    next();
  });
};

module.exports = verifyToken;
