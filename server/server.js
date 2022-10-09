import * as dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server: listening on port ${port}`));
