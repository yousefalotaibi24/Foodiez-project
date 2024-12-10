// this controller is created to add/Modify/Read a new Account

const Account = require("../../models/Account");

// ----------------------------------------------------------------
//to creat a new Account
const creatNewAccount = async (newAccountData) => {
  console.log("Creating new Account", newAccountData);
  const newAccount = await Account.create(newAccountData);
  return newAccount;
}; 
exports.creatAccountController = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newAccount = creatNewAccount(req.body);
    res.status(201).json(newAccount);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; 

// ----------------------------------------------------------------
// to get all accounts/ users Fetch Get
exports.listAccountsController = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
}; 

// ----------------------------------------------------------------
// to Find an Account
// to find an account by ID
exports.accountDetailIdController = async (req, res) => {
  const { accountId } = req.params;
  const account = await Account.findById(accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
}; 
// to find an account by UserName
exports.accountDetailUserController = (req, res) => {
  const { userName } = req.params;
  const name = Account.find(
    (name) => name.username.toLowerCase() === userName.toLowerCase()
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
}; 

// ----------------------------------------------------------------
// to Update an account accounts/ users
//by ID
exports.updateAccountController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(200).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------
// to delete an account accounts/ users
// Delete by ID
exports.deleteAccountIdController = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; 
// Delete by Username

// ----------------------------------------------------------------
//END of Controller
