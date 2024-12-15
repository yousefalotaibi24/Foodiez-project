const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("./key");

const User = require("./models/Account");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (name, password, done) => {
    try {
      const user = await User.findOne({ name });
      const passwordsMatch = user
        ? await bcrypt.compare(password, user.password)
        : false;
      if (passwordsMatch) {
        return done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  }
);
