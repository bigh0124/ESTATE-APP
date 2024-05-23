import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/addChat", verifyToken, addChat);

export default router;
