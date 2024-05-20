import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.get("/getPost/:postId", getPost);
router.post("/addPost", verifyToken, addPost);
router.put("/updatePost/:postId", verifyToken, updatePost);
router.delete("/deletePost/:postId", verifyToken, deletePost);

export default router;
