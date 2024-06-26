import prisma from "../lib/prisma.js";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res, next) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      where: {
        city: query.city || undefined,
        bedroom: parseInt(query.bedroom, 10) || undefined,
        bathroom: parseInt(query.bathroom, 10) || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        price: {
          gte: parseInt(query.minPrice, 10) || 0,
          lte: parseInt(query.maxPrice, 10) || 100000000,
        },
      },
    });
    if (!posts) return next(createError(404, "posts not found"));
    res.status(200).json(posts);
  } catch (err) {
    next(createError());
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.postId },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    if (!post) return next(createError(404, "post not found"));

    const token = req.cookies?.access_token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return next(createError(403, "Forbidden!"));

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              userId: payload.id,
              postId: req.params.postId,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    } else {
      res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    next(createError());
  }
};

export const addPost = async (req, res, next) => {
  const { postData, postDetail } = req.body;
  const userId = req.userId;
  // console.log({ ...postData, userId, postDetail });
  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId,
        postDetail: {
          create: postDetail,
        },
      },
    });
    // console.log("newPost", newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    next(createError());
  }
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return next(createError(404, "post not found"));
    if (post.userId !== userId) return next(createError(403, "You are only allowed to update your own post."));
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    next(createError());
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return next(createError(404, "Post not found"));
    }

    if (post.userId !== userId) {
      return next(createError(403, "You are only allowed to delete your own post."));
    }

    await prisma.post.delete({ where: { id: postId } });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    next(createError(500, "Internal Server Error"));
  }
};

export const savePost = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.body.postId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res.status(200).json("savedPost deleted");
    }
    if (!savedPost) {
      const newSavedPost = await prisma.savedPost.create({
        data: {
          userId,
          postId,
        },
      });
      return res.status(201).json(newSavedPost);
    }
  } catch (err) {
    next(createError());
  }
};
