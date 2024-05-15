import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";

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
