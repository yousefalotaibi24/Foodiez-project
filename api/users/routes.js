const express = require("express");
const router = express.Router();
const passport = require("passport");

const { registerUser, loginUser, logoutUser } = require("./controllers");

router.post("/register", registerUser);
router.post("/login", passport.authenticate('local',{session: false}), loginUser);
// router.post("/logout", logoutUser);

module.exports = router