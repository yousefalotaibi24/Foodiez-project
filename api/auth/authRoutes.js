const express = require("express");
const {
  registerAccount,
  loginAccount,
  logoutAccount,
} = require("./authController");
const passport = require("passport");
const router = express.Router();

router.post("/signup", registerAccount);

router.post("/login", loginAccount);

router.post("/logout", logoutAccount);

module.exports = router;
