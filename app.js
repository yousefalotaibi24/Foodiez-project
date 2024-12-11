const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");

const accountsRouter = require("./api/Account/accountsRoutes");
const categoriesRouter = require("./api/Category/categoryRoutes");
const ingredientsRouter = require("./api/Ingredient/ingredientsRoutes");
const recipesRouter = require("./api/Recipe/recipesRoutes");

app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);
connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
