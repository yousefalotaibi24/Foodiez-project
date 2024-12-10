const Account = require("../../models/Account");

exports.createAccount = async (req, res) => {
  const book = new Account(req.body);
  const newAccount = await book.save();
  res.status(201).json(newAccount);
};

exports.accountDetail = async (req, res) => {
  const { accountId } = req.params;
  const account = await Account.findById(accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
};

exports.listAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    await foundAccount.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  const foundAccount = await Account.findById(accountId);
  if (foundAccount) {
    await foundAccount.deleteOne();
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};
