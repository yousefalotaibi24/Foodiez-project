const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");


app.use(express.json());
app.use('/media', 
  express.static(path.join(__dirname, 'media')) 
); 
app.use("/accounts", accountsRouter)
connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
