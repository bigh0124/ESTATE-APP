import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";

export const addMessage = async (req, res, next) => {
  const userId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    if (!chat) return next(createError(404, "chat not found"));

    const newMessage = await prisma.message.create({
      data: {
        userId,
        chatId,
        text,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [userId],
        lastMessage: text,
      },
    });

    res.status(201).json(newMessage);
  } catch (err) {
    next(createError());
  }
};
