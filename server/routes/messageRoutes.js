import express from "express";
import {
   createNewMessage,
   getAllMessages,
   getAllNonSeenMessages,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/non-seen").get(getAllNonSeenMessages);

router.route("/").post(createNewMessage);

router.route("/:chatId").get(getAllMessages);

export default router;
