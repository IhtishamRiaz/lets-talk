import express from "express";
const router = express.Router();
import { createNewChat, getAllChats } from "../controllers/chatControllers.js";

router.route("/").post(createNewChat).get(getAllChats);

export default router;
