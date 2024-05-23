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

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== userId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

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

export const readChat = async (req, res) => {
  const userId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
