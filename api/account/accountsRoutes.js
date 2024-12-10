const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
// ----------------------------------------------------------------

// our controllers
const {
  creatAccountController,
  accountDetailIdController,
  accountDetailUserController,
  listAccountsController,
  updateAccountController,
  deleteAccountIdController,
} = require("./accountControllers");

// ----------------------------------------------------------------

// to store images
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
}); // add this from lesson upload image  multer

const upload = multer({
  storage,
}); // add this from lesson upload image  multer
// ----------------------------------------------------------------
// Route List Under this Line
// ----------------------------------------------------------------
//Account Routs
// to get all accounts/ users Fetch Get
router.get("/", listAccountsController);
//to creat a new Account
router.post("/", upload.single("image"), creatAccountController);
// to Update an account accounts/ users by ID
router.put(
  "/:accountId",
  upload.single("image"),
  updateAccountController
);
// to delete an account accounts/ users by ID
router.delete("/:accountId", deleteAccountIdController);
// to delete an account accounts/ users by UserName

// to find an account by ID
router.get("/:accountId", accountDetailIdController);
// to find an account by UserName
router.get("/:userName", accountDetailUserController);
// ----------------------------------------------------------------

module.exports = router;
