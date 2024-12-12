const express = require("express");
const multer = require("multer");
const router = express.Router();

// ----------------------------------------------------------------

// Account Controllers
const {
  createAccountController,
  accountDetailIdController,
  listAccountsController,
  updateAccountController,
  deleteAccountIdController,
} = require("./accountControllers");

// ----------------------------------------------------------------

// To Store Images

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

// ----------------------------------------------------------------

//Account Routes

//Create an Account
router.post("/", upload.single("image"), createAccountController);

// Retrieve all Accounts
router.get("/", listAccountsController);

// Retrieve Account by ID
router.get("/:accountId", accountDetailIdController);

// Update an Account by ID
router.put("/:accountId", upload.single("image"), updateAccountController);

// Delete Account by ID
router.delete("/:accountId", deleteAccountIdController);

// ----------------------------------------------------------------

module.exports = router;
