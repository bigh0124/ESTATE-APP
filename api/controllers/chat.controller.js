import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";

export const getChats = async (req, res, next) => {
  const userId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    res.status(200).json(chats);
  } catch (err) {
    next(createError());
  }
};

export const addChat = async (req, res, next) => {
  const userId = req.userId;
  const receiverId = req.body.receiverId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [userId, receiverId],
      },
    });

    res.status(201).json(newChat);
  } catch (err) {
    next(createError());
  }
};
