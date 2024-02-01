import express from "express";
import {
   createNewMessage,
   getAllMessages,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/:chatId").get(getAllMessages);

router.route("/").post(createNewMessage);

export default router;
