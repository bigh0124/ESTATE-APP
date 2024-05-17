import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getUser/:userId", verifyToken, getUser);
router.put("/updateUser/:userId", verifyToken, updateUser);

export default router;
