import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "Unauthorized!"));
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "Forbidden!"));

    req.userId = payload.id;
    next();
  });
};

export default verify;
