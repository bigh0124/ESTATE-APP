import { createError } from "../utils/createError.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  if (req.userId !== req.params.userId) next(createError(403, "Not Authoriztion"));

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) next(createError(401, "Not Authoriztion"));

    const { password, ...userInfo } = user;

    res.status(200).json(userInfo);
  } catch (err) {
    next(createError());
  }
};

export const updateUser = async (req, res, next) => {
  if (req.userId !== req.params.userId) next(createError(403, "Not Authoriztion"));

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: { ...req.body },
    });
    const { password, ...userInfo } = updatedUser;
    res.status(200).json(userInfo);
  } catch (err) {
    next(createError());
  }
};
