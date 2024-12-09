const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");


app.use(express.json());

connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
