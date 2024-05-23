import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addChat, getChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/getChats", verifyToken, getChats);
router.post("/addChat", verifyToken, addChat);

export default router;
