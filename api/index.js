import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./routes/user.route.js";
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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  let message = err.message || "Internal Server Error"; // Default message

  // Error mapping based on error type and properties
  if (err.name === "CastError") {
    message = `Invalid value for path '${err.path}': ${err.value}!`;
  } else if (err.code === 11000) {
    message = "User already exists.";
  } else if (err.name === "ValidationError") {
    // Provide more specific validation errors from the error object
    const validationErrors = err.errors
      .map((error) => error.message)
      .join(", ");
    message = `invalid input data :  ${validationErrors}`;
  } else {
    // Consider logging unhandled errors for debugging
    console.error("Unhandled error:", err);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
