const { validationResult } = require("express-validator");
const { errorResponse } = require("./responseHelper");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validasyon hatası", errors.array(), 400);
  }
  next();
};

module.exports = { validateRequest };
