import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({ take: 10 });
    if (!posts) next(createError(404, "posts not found"));
    res.status(200).json(posts);
  } catch (err) {
    next(createError());
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: req.params.postId } });
    if (!post) next(createError(404, "post not found"));

    res.status(200).json(post);
  } catch (err) {
    next(createError());
  }
};
