import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  const error = {
    success: false,
    statusCode,
    message,
  };

  res.status(statusCode).json(error);
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
