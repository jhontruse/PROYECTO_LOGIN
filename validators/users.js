const { check } = require("express-validator");
const validationResult = require("../utils/handleValidator");

const validatorRegister = [
  check("nombre").exists().notEmpty().isLength({ min: 3, max: 255 }),
  check("apellido").exists().notEmpty().isLength({ min: 3, max: 255 }),
  check("username").exists().notEmpty().isLength({ min: 3, max: 255 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3 }),
  check("estado").exists().notEmpty().isBoolean(),
  (req, res, next) => {
    return validationResult(req, res, next);
  },
];

const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 3 }),
  check("username").exists().notEmpty().isLength({ min: 3, max: 255 }),
];

module.exports = { validatorRegister, validatorLogin };
