const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");

const accountsRouter = require("./apis/accounts/routes"); // this to be checked and changed

app.use(express.json());
app.use('/media', 
  express.static(path.join(__dirname, 'media')) // this will give you your path exatly to ur media file
); // from notion express to uplode image class to upload image form server
app.use("/accounts", accountsRouter) // this one to be checked
connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
