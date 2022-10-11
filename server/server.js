import * as dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";

import { users } from "./routes/api/users.js";

const app = express();

app
  .use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  .use(bodyParser.json());

const db = process.env.MONGODB_URL;

mongoose
  .connect(db, { useNewURLParser: true })
  .then(() => console.log("MongoDB: connection successful"))
  .catch((err) =>
    console.log(`
    MongoDB: connection error
    Error: ${err}
  `)
  );

app.use(passport.initialize());

import { passportConfig } from "./config/passport.js";

passportConfig(passport);

app.use("/api/users", users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server: listening on port ${port}`));
