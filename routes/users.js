const express = require("express");
const router = express.Router();
const {
  getItems,
  createItems,
  getPaginacionItem,
  getItem,
} = require("../controllers/user");
const validatorRegister = require("../validators/users");

router.get("/", getItems);
router.post("/", validatorRegister, createItems);
router.get("/:offset/:limit", getPaginacionItem);
router.get("/:id", getItem);

module.exports = router;
