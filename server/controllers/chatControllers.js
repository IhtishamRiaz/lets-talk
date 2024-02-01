import Chat from "../models/chatModel.js";

// @desc Get All Chats
// @route GET /chats
// @access Private
const getAllChats = async (req, res) => {
   try {
      const userId = req.userId;

      const chats = await Chat.find({ members: { $in: [userId] } })
         .populate("members", "name" + " username")
         .exec();

      res.status(200).json(chats);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc Get All Chats
// @route GET /chats
// @access Private
const createNewChat = async (req, res) => {
   try {
      const { members } = req.body;

      if (members.length < 2) {
         return res
            .status(400)
            .json({ message: "Please select atleast two users!" });
      }

      const existingChat = await Chat.findOne({
         members: { $all: members },
      });

      if (existingChat) {
         return res
            .status(400)
            .json({ message: "Chat with these users already exists!" });
      }

      const newChat = await Chat.create({
         members,
      });

      if (!newChat) {
         return res.status(400).json({ message: "Failed to Create Chat!" });
      }

      // const chats = await Chat.find().lean();

      res.status(201).json({ message: "New Chat Created!", newChat });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export { getAllChats, createNewChat };
