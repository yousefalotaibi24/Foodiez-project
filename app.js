const express = require("express");
const connectDb = require("./database");
const app = express();
const port = 8000;
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const { localStrategy, jwtStrategy } = require("./passport");
const accountsRouter = require("./api/Account/accountsRoutes");
const categoriesRouter = require("./api/Category/categoryRoutes");
const ingredientsRouter = require("./api/Ingredient/ingredientsRoutes");
const recipesRouter = require("./api/Recipe/recipesRoutes");
const authRouter = require("./api/auth/authRoutes");
const usersRouter = require("./api/users/routes")

app.use(cors())
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/accounts", accountsRouter);
app.use("/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter)


connectDb();

app.listen(port, () => {
  console.log(`This is to test if my server is working at port: ${port}`);
});
