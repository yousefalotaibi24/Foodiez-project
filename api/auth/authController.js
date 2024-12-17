const bcrypt = require("bcrypt");
const Account = require("../../models/Account");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../keys");

exports.registerAccount = async (req, res) => {
  const saltRounds = 10;
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const account = Account(req.body);
    await account.save();
    const payload = {
      id: account.id,
      name: account.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};

exports.logoutAccount = async (req, res) => {
  const users = await Account.find({ session: `${req.body.token}` });
  if (users.length > 0) {
    const account = users[0];
    account.session = null;
    await account.save();
  }
  res.status(200).json();
};

exports.loginAccount = async (req, res) => {
  const { account } = req;
  const payload = {
    id: account.id,
    username: account.name,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
