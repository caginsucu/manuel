const { body, param, validationResult } = require("express-validator");
const { validateRequest } = require("../../utils/validation");

const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("İsim boş bırakılamaz")
    .isLength({ min: "2" })
    .withMessage("İsim en az 2 karakter olmalıdır"),
  body("email")
    .isEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Şifre en az 6 karakter olmalıdır")
    .matches(/\d/)
    .withMessage("Şifre en az bir rakam içermelidir"),
  //   body("confirmPassword").custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error("Şifreler eşleşmiyor");
  //     }
  //     return true;
  //   }),
];

module.exports = { validateRegister };
