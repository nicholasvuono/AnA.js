import * as dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import mongoose from "mongoose";

const User = mongoose.model("users");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.API_JWT_SECRET_KEY;

export const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
