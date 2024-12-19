const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const { localStrategy, jwtStrategy } = require("./passport");
const categoriesRouter = require("./api/Category/categoryRoutes");
const ingredientsRouter = require("./api/Ingredient/ingredientsRoutes");
const recipesRouter = require("./api/Recipe/recipesRoutes");
const usersRouter = require("./api/users/routes");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/categories", categoriesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/auth", usersRouter);

connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
