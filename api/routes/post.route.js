import express from "express";
import { getPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.get("/getPost/:postId", getPost);

export default router;
