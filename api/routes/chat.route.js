import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addChat, getChat, getChats, readChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/getChats", verifyToken, getChats);
router.get("/getChat/:chatId", verifyToken, getChat);
router.post("/addChat", verifyToken, addChat);
router.put("/readChat/:chatId", verifyToken, readChat);

export default router;
