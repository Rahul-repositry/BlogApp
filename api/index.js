import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json()); //express.json() is a middleware function that is used to parse incoming request bodies that are encoded in the JSON format. It will parse the request body and make the data available in the req.body object.
app.use(express.urlencoded({ extended: true })); //  On the other hand, express.urlencoded() is a middleware function that is used to parse incoming request bodies that are encoded in the application/x-www-form-urlencoded format. It will also parse the request body and make the data available in the req.body object.

app.use(cookieParser()); // cookie-parser is a middleware function for Express that is used to parse incoming cookies and make them available in the req.cookies object.
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
