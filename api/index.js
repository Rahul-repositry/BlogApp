import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
