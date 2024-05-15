import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(createError());
  }
};

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    //check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) return next(createError(401, "Invalid Credentials: User NOT found"));

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next(createError(401, "Invalid Credentials: Password NOT correct"));

    //generate cookie token and send to the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 86400000,
        //make sure enable secure on prod
        //  secure: true
      })
      .status(200)
      .json({ message: "Sign In successfully" });
  } catch (err) {
    next(createError());
  }
};
