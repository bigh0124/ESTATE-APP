import express from "express";
import { getNotificationNumber, getProfilePosts, getUser, updateUser } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getUser/:userId", verifyToken, getUser);
router.put("/updateUser/:userId", verifyToken, updateUser);
router.get("/getProfilePosts", verifyToken, getProfilePosts);
router.get("/getNotificationNumber", verifyToken, getNotificationNumber);

export default router;
