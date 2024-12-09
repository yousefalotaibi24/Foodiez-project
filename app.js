const express = require("express");
const connectDb = require("./database");

const app = express();

connectDb();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
