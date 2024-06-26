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
  let { password, avatar, ...inputs } = req.body;
  if (avatar) avatar = avatar[0];
  try {
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: { ...inputs, ...(password && { password }), ...(avatar && { avatar }) },
    });
    const { password: userPassword, ...userInfo } = updatedUser;
    res.status(200).json(userInfo);
  } catch (err) {
    next(createError());
  }
};

export const getProfilePosts = async (req, res, next) => {
  const userId = req.userId;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    if (!posts) {
      return next(createError(404, "Posts not found"));
    }
    const saved = await prisma.savedPost.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);

    res.status(200).json({ myPosts: posts, savedPosts: savedPosts });
  } catch (err) {
    next(createError());
  }
};

export const getNotificationNumber = async (req, res, next) => {
  const userId = req.userId;
  try {
    const chatsNumber = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [userId],
        },
        NOT: {
          seenBy: {
            hasSome: [userId],
          },
        },
      },
    });
    res.status(200).json(chatsNumber);
  } catch (err) {
    next(createError());
  }
};
