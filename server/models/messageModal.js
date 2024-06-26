import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
   {
      senderId: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         trim: true,
      },
      chatId: {
         type: String,
         required: true,
      },
      seen: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
