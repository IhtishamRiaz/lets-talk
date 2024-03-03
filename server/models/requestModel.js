import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
