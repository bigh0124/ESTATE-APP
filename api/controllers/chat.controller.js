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

export const getChat = async (req, res, next) => {
  const chatId = req.params.chatId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [req.userId],
        },
      },
      include: {
        Message: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          push: [req.userId],
        },
      },
    });
    res.status(200).json(chat);
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
