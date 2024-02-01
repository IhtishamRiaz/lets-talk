import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
   {
      members: {
         type: [mongoose.Schema.Types.ObjectId],
         ref: "User",
         required: true,
      },
      isGroup: {
         type: Boolean,
         default: false,
         required: true,
      },
   },
   { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
