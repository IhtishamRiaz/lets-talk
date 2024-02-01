import Message from "../models/messageModal.js";

// @desc Get All Messages
// @route GET /message
// @access Private
const getAllMessages = async (req, res) => {
   try {
      const { chatId } = req.params;
      console.log(chatId);

      const messages = await Message.find({ chatId }).exec();
      res.json(messages);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc Create New Message
// @route POST /message
// @access Private
const createNewMessage = async (req, res) => {
   try {
      const { chatId, content } = req.body;
      const senderId = req.userId;

      if (!chatId || !content) {
         return res.status(400).json({ message: "Missing Information!" });
      }

      const newMessage = await Message.create({ chatId, content, senderId });
      if (!newMessage) {
         return res.status(400).json({ message: "Failed to Create Message!" });
      }

      res.status(201).json({ message: "Message Sent!" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export { getAllMessages, createNewMessage };
