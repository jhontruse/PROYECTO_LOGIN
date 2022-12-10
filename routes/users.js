const express = require("express");
const router = express.Router();
const {
  getItems,
  createItems,
  getPaginacionItem,
  getItem,
  loginCtrl,
} = require("../controllers/user");
const { validatorRegister, validatorLogin } = require("../validators/users");

router.get("/", getItems);
router.post("/", validatorRegister, createItems);
router.get("/:offset/:limit", getPaginacionItem);
router.get("/:id", getItem);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
