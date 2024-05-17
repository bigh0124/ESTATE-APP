import { createError } from "../utils/createError.js";
import prisma from "../lib/prisma.js";

export const getUser = async (req, res, next) => {
  if (req.userId !== req.params.userId) next(createError(401, "Not Authoriztion"));

  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) next(createError(401, "Not Authoriztion"));

    const { password, ...userInfo } = user;

    res.status(200).json(userInfo);
  } catch (err) {
    next(createError());
  }
};
